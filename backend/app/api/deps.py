from typing import Generator, List, Any
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.core.config import settings
from app.db.models.user import User

# OAuth2 scheme for JWT
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")

def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token, 
            settings.SECRET_KEY, 
            algorithms=[settings.ALGORITHM],
            audience=settings.JWT_AUDIENCE,
            issuer=settings.JWT_ISSUER
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise credentials_exception
        
    # Inject token payload into the user context so we don't need to re-parse it
    user.token_payload = payload
    return user

def get_current_active_user(
    current_user: User = Depends(get_current_user),
) -> User:
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

def require_permissions(required_permissions: List[str]):
    """
    Dependency factory that checks if the JWT token contains the required permissions.
    """
    def permission_checker(current_user: User = Depends(get_current_active_user)):
        # Extract permissions embedded in the JWT payload
        user_permissions = current_user.token_payload.get("permissions", [])
        
        # Check if the user has all required permissions
        for p in required_permissions:
            if p not in user_permissions and "*" not in user_permissions:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"Not enough permissions. Requires: {p}"
                )
        return current_user
    return permission_checker

def enforce_tenant_isolation(
    current_user: User = Depends(get_current_active_user)
) -> str:
    """
    Dependency that returns the organization_id from the user's token.
    This guarantees that the user is making a request within their tenant context.
    For Super Admins, they might have a special flag, but for standard hospitals, this is enforced.
    """
    org_id = current_user.token_payload.get("org")
    if not org_id:
        raise HTTPException(status_code=403, detail="Tenant context missing from token")
    
    # Super Admin Check: If the organization is the Equicare Master Org, allow all.
    # Otherwise return the specific org ID.
    return org_id

def get_manageable_scope(
    current_user: User = Depends(get_current_active_user)
) -> dict:
    """
    Returns the scope (facility_id, department_id) the user is allowed to manage.
    If the user is an HOD, they can only manage their own facility and department.
    """
    if current_user.role and current_user.role.name == "HOD Medical Engineering":
        return {
            "facility_id": current_user.facility_id,
            "department_id": current_user.department_id
        }
    return {}

