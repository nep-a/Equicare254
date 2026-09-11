from sqlalchemy import String, DateTime, ForeignKey, Integer, Numeric, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship, Mapped, mapped_column
import uuid
from datetime import datetime
from app.db.database import Base
from typing import List, Optional

class Part(Base):
    __tablename__ = "parts"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("organizations.id"), nullable=False)
    
    part_number: Mapped[str] = mapped_column(String, nullable=False, index=True)
    description: Mapped[str] = mapped_column(String, nullable=False)
    manufacturer_id: Mapped[Optional[uuid.UUID]] = mapped_column(ForeignKey("vendors.id"), nullable=True)
    
    cost: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False, default=0.0)
    minimum_stock_threshold: Mapped[int] = mapped_column(Integer, default=5)
    
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    manufacturer: Mapped[Optional["Vendor"]] = relationship("Vendor")
    inventory_levels: Mapped[List["InventoryLevel"]] = relationship("InventoryLevel", back_populates="part")

class InventoryLevel(Base):
    __tablename__ = "inventory_levels"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id: Mapped[Optional[uuid.UUID]] = mapped_column(ForeignKey("organizations.id"), nullable=True)
    part_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("parts.id"), nullable=False)
    facility_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("facilities.id"), nullable=False)
    
    quantity_on_hand: Mapped[int] = mapped_column(Integer, default=0)
    location_details: Mapped[Optional[str]] = mapped_column(String, nullable=True) # E.g., Shelf A2, Bin 4
    
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    last_updated: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    part: Mapped["Part"] = relationship("Part", back_populates="inventory_levels")
    facility: Mapped["Facility"] = relationship("Facility")
