from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.api import deps
from app.schemas.user import UserResponse, UserInvite, UserActivate
from app.crud.crud_user import user as crud_user
from app.db.models.user import User

router = APIRouter()

@router.post("/invite", response_model=dict)
def invite_user(
    *,
    db: Session = Depends(deps.get_db),
    user_in: UserInvite,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Invite a new user.
    """
    # Simple check for manage permissions. Realistically, use role-based checks.
    # In a real app, verify they can assign the organization, facility, department.
    
    # Check if user already exists
    existing_user = crud_user.get_by_email(db, email=user_in.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this email already exists.")
    
    new_user, token = crud_user.invite_user(db, obj_in=user_in, invited_by_id=current_user.id)
    
    # Mocking email dispatch
    invitation_link = f"http://localhost:3000/accept-invite?token={token}"
    return {"message": "User invited successfully", "invitation_link": invitation_link}

@router.get("/invitation/verify", response_model=dict)
def verify_invitation(
    token: str = Query(...),
    db: Session = Depends(deps.get_db)
) -> Any:
    """
    Verify an invitation token.
    """
    try:
        invite_id, secret = token.split(":")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid token format.")
        
    invitation = crud_user.verify_token_by_id(db, invite_id=invite_id, raw_secret=secret)
    if not invitation:
        raise HTTPException(status_code=400, detail="Invalid or expired token.")
        
    return {"valid": True, "email": invitation.user.email}

@router.post("/invitation/accept", response_model=UserResponse)
def accept_invitation(
    *,
    db: Session = Depends(deps.get_db),
    activate_in: UserActivate
) -> Any:
    """
    Accept an invitation and activate the user.
    """
    try:
        invite_id, secret = activate_in.token.split(":")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid token format.")
        
    invitation = crud_user.verify_token_by_id(db, invite_id=invite_id, raw_secret=secret)
    if not invitation:
        raise HTTPException(status_code=400, detail="Invalid or expired token.")
        
    user_to_activate = invitation.user
    from app.crud.crud_user import pwd_context
    user_to_activate.hashed_password = pwd_context.hash(activate_in.password)
    user_to_activate.account_status = "ACTIVE"
    invitation.status = "ACCEPTED"
    
    db.commit()
    db.refresh(user_to_activate)
    return user_to_activate

@router.get("/", response_model=List[UserResponse])
def read_users(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
    manageable_scope: dict = Depends(deps.get_manageable_scope)
) -> Any:
    """
    Retrieve users, respecting RBAC scope.
    """
    query = db.query(User)
    
    # Enforce tenant isolation logic here
    # Assuming standard users can only see users in their organization
    org_id = current_user.token_payload.get("org") if hasattr(current_user, "token_payload") else current_user.organization_id
    query = query.filter(User.organization_id == org_id)

    # Enforce manageable scope
    if manageable_scope:
        if "facility_id" in manageable_scope and manageable_scope["facility_id"]:
            query = query.filter(User.facility_id == manageable_scope["facility_id"])
        if "department_id" in manageable_scope and manageable_scope["department_id"]:
            query = query.filter(User.department_id == manageable_scope["department_id"])

    users = query.offset(skip).limit(limit).all()
    return users
