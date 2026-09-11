from sqlalchemy import String, DateTime, ForeignKey, Numeric
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship, Mapped, mapped_column
import uuid
from datetime import datetime
from app.db.database import Base

class ProcurementRequest(Base):
    __tablename__ = "procurement_requests"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    department_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("departments.id"), nullable=True)
    vendor_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("vendors.id"), nullable=True)
    
    request_number: Mapped[str] = mapped_column(String, nullable=False, index=True)
    equipment_name: Mapped[str] = mapped_column(String, nullable=False)
    justification: Mapped[str] = mapped_column(String, nullable=False)
    estimated_cost: Mapped[float | None] = mapped_column(Numeric(12, 2), nullable=True)
    
    status: Mapped[str] = mapped_column(String, nullable=False, default="Requested") # Requested, Approved, Ordered, Delivered
    
    requested_date: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    expected_delivery_date: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    
    department: Mapped["Department"] = relationship("Department")
    vendor: Mapped["Vendor"] = relationship("Vendor")
    
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
