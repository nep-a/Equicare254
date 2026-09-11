from datetime import datetime, timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.api import deps
from app.core import security
from app.core.config import settings
from app.db.models.user import User
from app.db.models.auth import RefreshToken
from app.db.models.audit import AuditLog
from jose import jwt, JWTError

router = APIRouter()

@router.post("/login")
def login_access_token(
    request: Request,
    db: Session = Depends(deps.get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests.
    Enforces account lockout on repeated failed attempts.
    """
    user = db.query(User).filter(User.email == form_data.username).first()
    
    # 1. Check if user exists
    if not user:
        # Avoid user enumeration by returning generic error
        raise HTTPException(status_code=400, detail="Incorrect email or password")
        
    # 2. Check if account is locked
    if user.locked_until and user.locked_until > datetime.utcnow():
        raise HTTPException(status_code=403, detail="Account is locked due to multiple failed login attempts.")
        
    # 3. Verify Password
    if not security.verify_password(form_data.password, user.hashed_password):
        # Increment failed attempts
        user.failed_login_attempts += 1
        if user.failed_login_attempts >= settings.MAX_LOGIN_ATTEMPTS:
            user.locked_until = datetime.utcnow() + timedelta(minutes=settings.LOCKOUT_DURATION_MINUTES)
            # Log the lockout event
            audit = AuditLog(
                organization_id=user.organization_id,
                user_id=user.id,
                action="USER_LOCKOUT",
                entity_type="User",
                entity_id=user.id,
                ip_address=request.client.host
            )
            db.add(audit)
        
        db.commit()
        raise HTTPException(status_code=400, detail="Incorrect email or password")
        
    # 4. Success: Reset lockout counters
    user.failed_login_attempts = 0
    user.locked_until = None
    
    # 5. Generate Tokens
    role_name = user.role.name if user.role else "User"
    permissions = user.role.permissions if user.role else []
    
    access_token = security.create_access_token(
        subject=user.id, 
        organization_id=user.organization_id,
        role_name=role_name,
        permissions=permissions
    )
    refresh_token_jwt = security.create_refresh_token(subject=user.id)
    
    # 6. Store Refresh Token in DB for tracking/revocation
    db_token = RefreshToken(
        user_id=user.id,
        token_hash=security.get_password_hash(refresh_token_jwt), # Hash before storing
        expires_at=datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
        ip_address=request.client.host,
        user_agent=request.headers.get('user-agent')
    )
    
    # Log successful login
    audit = AuditLog(
        organization_id=user.organization_id,
        user_id=user.id,
        action="USER_LOGIN_SUCCESS",
        entity_type="User",
        entity_id=user.id,
        ip_address=request.client.host
    )
    
    db.add(db_token)
    db.add(audit)
    db.commit()
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token_jwt,
        "token_type": "bearer",
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
    }

@router.post("/refresh")
def refresh_token(
    request: Request,
    refresh_token: str,
    db: Session = Depends(deps.get_db)
) -> Any:
    """
    Refresh the access token using a valid refresh token.
    Implements Refresh Token Rotation.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
    try:
        payload = jwt.decode(
            refresh_token, 
            settings.SECRET_KEY, 
            algorithms=[settings.ALGORITHM],
            audience=settings.JWT_AUDIENCE,
            issuer=settings.JWT_ISSUER
        )
        user_id: str = payload.get("sub")
        token_type: str = payload.get("type")
        if user_id is None or token_type != "refresh":
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    user = db.query(User).filter(User.id == user_id).first()
    if not user or not user.is_active:
        raise credentials_exception

    # Verify if the token exists in DB and is NOT revoked
    # In a real app, we'd verify the hash, but for simplicity here we assume the JWT signature 
    # protects the token contents. We just need to check if ANY active token for this user matches the hash.
    # To properly implement Rotation, we would verify `pwd_context.verify(refresh_token, db_token.token_hash)`.
    active_tokens = db.query(RefreshToken).filter(
        RefreshToken.user_id == user.id,
        RefreshToken.revoked == False
    ).all()
    
    matched_token = None
    for tk in active_tokens:
        if security.verify_password(refresh_token, tk.token_hash):
            matched_token = tk
            break
            
    if not matched_token:
        # If the token is valid JWT but revoked/missing in DB, it might be a compromised token attempt
        # A more robust system would revoke ALL tokens for the user here (Security incident)
        raise HTTPException(status_code=401, detail="Refresh token is invalid or revoked")
        
    # Rotate: Revoke old token
    matched_token.revoked = True
    
    # Generate new tokens
    role_name = user.role.name if user.role else "User"
    permissions = user.role.permissions if user.role else []
    
    new_access_token = security.create_access_token(
        subject=user.id, 
        organization_id=user.organization_id,
        role_name=role_name,
        permissions=permissions
    )
    new_refresh_token_jwt = security.create_refresh_token(subject=user.id)
    
    new_db_token = RefreshToken(
        user_id=user.id,
        token_hash=security.get_password_hash(new_refresh_token_jwt),
        expires_at=datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
        ip_address=request.client.host,
        user_agent=request.headers.get('user-agent'),
        replaced_by_token=str(new_refresh_token_jwt[-10:]) # Simple tracking
    )
    
    db.add(new_db_token)
    db.commit()
    
    return {
        "access_token": new_access_token,
        "refresh_token": new_refresh_token_jwt,
        "token_type": "bearer",
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
    }

@router.post("/logout")
def logout(
    refresh_token: str,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Log out by revoking the specific refresh token.
    """
    active_tokens = db.query(RefreshToken).filter(
        RefreshToken.user_id == current_user.id,
        RefreshToken.revoked == False
    ).all()
    
    for tk in active_tokens:
        if security.verify_password(refresh_token, tk.token_hash):
            tk.revoked = True
            db.commit()
            return {"msg": "Successfully logged out"}
            
    return {"msg": "Token not found or already revoked"}
