from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from uuid import UUID
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    phone_number: Optional[str] = None
    professional_title: Optional[str] = None
    employee_id: Optional[str] = None
    organization_id: UUID
    role_id: UUID
    facility_id: Optional[UUID] = None
    department_id: Optional[UUID] = None

class UserCreate(UserBase):
    password: str = Field(..., min_length=8)

class UserInvite(UserBase):
    pass

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone_number: Optional[str] = None
    professional_title: Optional[str] = None
    employee_id: Optional[str] = None
    role_id: Optional[UUID] = None
    facility_id: Optional[UUID] = None
    department_id: Optional[UUID] = None
    account_status: Optional[str] = None

class UserActivate(BaseModel):
    token: str
    password: str = Field(..., min_length=8)

class UserResponse(UserBase):
    id: UUID
    account_status: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
