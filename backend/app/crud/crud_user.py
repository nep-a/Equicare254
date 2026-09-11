import secrets
from datetime import datetime, timedelta
from typing import Optional, Tuple
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app.db.models.user import User, UserInvitation
from app.schemas.user import UserCreate, UserInvite, UserUpdate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class CRUDUser:
    def get(self, db: Session, id: str) -> Optional[User]:
        return db.query(User).filter(User.id == id).first()

    def get_by_email(self, db: Session, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    def create(self, db: Session, obj_in: UserCreate) -> User:
        db_obj = User(
            email=obj_in.email,
            hashed_password=pwd_context.hash(obj_in.password),
            first_name=obj_in.first_name,
            last_name=obj_in.last_name,
            phone_number=obj_in.phone_number,
            professional_title=obj_in.professional_title,
            employee_id=obj_in.employee_id,
            organization_id=obj_in.organization_id,
            role_id=obj_in.role_id,
            facility_id=obj_in.facility_id,
            department_id=obj_in.department_id,
            account_status="ACTIVE"
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def invite_user(self, db: Session, obj_in: UserInvite, invited_by_id: str) -> Tuple[User, str]:
        # Create a pending user
        db_user = User(
            email=obj_in.email,
            hashed_password=None, # No password yet
            first_name=obj_in.first_name,
            last_name=obj_in.last_name,
            phone_number=obj_in.phone_number,
            professional_title=obj_in.professional_title,
            employee_id=obj_in.employee_id,
            organization_id=obj_in.organization_id,
            role_id=obj_in.role_id,
            facility_id=obj_in.facility_id,
            department_id=obj_in.department_id,
            account_status="PENDING"
        )
        db.add(db_user)
        db.flush() # flush to get user ID without committing
        
        # Generate token
        raw_secret = secrets.token_urlsafe(32)
        hashed_token = pwd_context.hash(raw_secret)
        
        # Create invitation record
        db_invitation = UserInvitation(
            user_id=db_user.id,
            invited_by_id=invited_by_id,
            token_hash=hashed_token,
            expires_at=datetime.utcnow() + timedelta(days=7),
            status="PENDING"
        )
        db.add(db_invitation)
        db.flush() # Flush to get db_invitation.id
        
        raw_token = f"{db_invitation.id}:{raw_secret}"
        db.commit()
        db.refresh(db_user)
        
        return db_user, raw_token

    def verify_token(self, db: Session, raw_token: str) -> Optional[UserInvitation]:
        # In a real system, you might want to look this up more efficiently
        # Since token_hash is hashed, we can't query by it directly.
        # Often a better approach is a token format like ID:SECRET
        # For simplicity, since all pending tokens are few, or if we encode the user ID in the token, it's easier.
        # However, let's just query all pending invitations and verify. 
        # Actually, best practice for tokens stored as hashes is: token = "{invite_id}:{secret}"
        pass

    def verify_token_by_id(self, db: Session, invite_id: str, raw_secret: str) -> Optional[UserInvitation]:
        invitation = db.query(UserInvitation).filter(UserInvitation.id == invite_id, UserInvitation.status == "PENDING").first()
        if not invitation:
            return None
        
        if pwd_context.verify(raw_secret, invitation.token_hash):
            if invitation.expires_at > datetime.utcnow():
                return invitation
        return None

user = CRUDUser()
