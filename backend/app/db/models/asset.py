import uuid
from datetime import datetime, date
from sqlalchemy import String, DateTime, ForeignKey, Date, Numeric, Boolean
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship, Mapped, mapped_column
from app.db.database import Base

class Asset(Base):
    __tablename__ = "assets"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("organizations.id"), nullable=False)
    model_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("equipment_models.id"), nullable=False)
    
    asset_number: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    serial_number: Mapped[str] = mapped_column(String, nullable=True)
    qr_code: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    
    status: Mapped[str] = mapped_column(String, default="Operational")
    risk_level: Mapped[str] = mapped_column(String, default="Moderate")
    
    acquisition_date: Mapped[date] = mapped_column(Date, nullable=True)
    commissioning_date: Mapped[date] = mapped_column(Date, nullable=True)
    purchase_cost: Mapped[float] = mapped_column(Numeric(12, 2), nullable=True)
    expected_useful_life_years: Mapped[float] = mapped_column(Numeric(4, 1), nullable=True)
    custom_attributes: Mapped[dict] = mapped_column(JSONB, nullable=True)
    
    # Supabase Storage Links
    photo_url: Mapped[str | None] = mapped_column(String, nullable=True)
    manual_url: Mapped[str | None] = mapped_column(String, nullable=True)
    
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    equipment_model: Mapped["EquipmentModel"] = relationship("EquipmentModel", back_populates="assets")
    location_history: Mapped[list["AssetLocationHistory"]] = relationship("AssetLocationHistory", back_populates="asset")

class AssetLocationHistory(Base):
    __tablename__ = "asset_location_history"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("organizations.id"), nullable=True)
    asset_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("assets.id"), nullable=False)
    location_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("locations.id"), nullable=False)
    assigned_date: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    removed_date: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    is_current: Mapped[bool] = mapped_column(Boolean, default=True)
    
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    asset: Mapped["Asset"] = relationship("Asset", back_populates="location_history")
    location: Mapped["Location"] = relationship("Location", back_populates="asset_history")
