from typing import Optional
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel, ConfigDict

class WorkOrderBase(BaseModel):
    wo_number: str
    equipment_id: UUID
    assigned_to: Optional[UUID] = None
    type: str
    priority: Optional[str] = "Normal"
    status: Optional[str] = "New"
    reported_fault: Optional[str] = None
    diagnosis: Optional[str] = None
    action_taken: Optional[str] = None
    downtime_minutes: Optional[int] = 0
    labor_cost: Optional[float] = 0.0
    parts_cost: Optional[float] = 0.0

class WorkOrderCreate(WorkOrderBase):
    pass

class WorkOrderUpdate(BaseModel):
    wo_number: Optional[str] = None
    equipment_id: Optional[UUID] = None
    assigned_to: Optional[UUID] = None
    type: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    reported_fault: Optional[str] = None
    diagnosis: Optional[str] = None
    action_taken: Optional[str] = None
    downtime_minutes: Optional[int] = None
    labor_cost: Optional[float] = None
    parts_cost: Optional[float] = None
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None

class WorkOrderInDBBase(WorkOrderBase):
    id: UUID
    organization_id: UUID
    created_at: datetime
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class WorkOrder(WorkOrderInDBBase):
    pass
