import uuid
from datetime import datetime
from sqlalchemy import String, DateTime, ForeignKey, Integer, Numeric, Text, Boolean
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship, Mapped, mapped_column
from app.db.database import Base

class WorkOrder(Base):
    __tablename__ = "work_orders"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("organizations.id"), nullable=False)
    
    wo_number: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    equipment_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("assets.id"), nullable=False)
    assigned_to: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), nullable=True)
    
    type: Mapped[str] = mapped_column(String, nullable=False) # Corrective, Preventive
    priority: Mapped[str] = mapped_column(String, default="Normal") # Low, Normal, High, Critical
    status: Mapped[str] = mapped_column(String, default="New") # New, Assigned, In Progress, Awaiting Parts, Completed, Approved, Closed
    
    reported_fault: Mapped[str] = mapped_column(Text, nullable=True)
    diagnosis: Mapped[str] = mapped_column(Text, nullable=True)
    action_taken: Mapped[str] = mapped_column(Text, nullable=True)
    
    downtime_minutes: Mapped[int] = mapped_column(Integer, default=0)
    labor_cost: Mapped[float] = mapped_column(Numeric(10, 2), default=0.0)
    parts_cost: Mapped[float] = mapped_column(Numeric(10, 2), default=0.0)
    
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    started_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    completed_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    equipment: Mapped["Asset"] = relationship("Asset")
    assigned_user: Mapped["User"] = relationship("User")
    tasks: Mapped[list["WorkOrderTask"]] = relationship("WorkOrderTask", back_populates="work_order")

class WorkOrderTask(Base):
    __tablename__ = "work_order_tasks"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("organizations.id"), nullable=True)
    work_order_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("work_orders.id"), nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=False)
    is_completed: Mapped[bool] = mapped_column(Boolean, default=False)
    completed_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    work_order: Mapped["WorkOrder"] = relationship("WorkOrder", back_populates="tasks")
