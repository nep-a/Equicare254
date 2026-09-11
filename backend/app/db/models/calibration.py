from typing import Optional
from sqlalchemy import String, DateTime, ForeignKey, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
import uuid
from datetime import datetime
from app.db.database import Base

class Calibration(Base):
    __tablename__ = "calibrations"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("organizations.id"), nullable=False)
    asset_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("assets.id"), nullable=False)
    
    performed_by: Mapped[str] = mapped_column(String, nullable=False)
    certificate_number: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    
    calibration_date: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    next_due_date: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    passed: Mapped[bool] = mapped_column(Boolean, default=True)
    
    notes: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    asset: Mapped['Asset'] = relationship("Asset")
