import uuid
from datetime import datetime
from sqlalchemy import String, DateTime, ForeignKey, Date, Numeric, Boolean
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship, Mapped, mapped_column
from app.db.database import Base

class EquipmentCategory(Base):
    __tablename__ = "equipment_categories"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("organizations.id"), nullable=True)
    name: Mapped[str] = mapped_column(String, index=True, nullable=False)
    
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    types: Mapped[list["EquipmentType"]] = relationship("EquipmentType", back_populates="category")

class EquipmentType(Base):
    __tablename__ = "equipment_types"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("organizations.id"), nullable=True)
    category_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("equipment_categories.id"), nullable=False)
    name: Mapped[str] = mapped_column(String, index=True, nullable=False)
    schema_definition: Mapped[dict] = mapped_column(JSONB, nullable=True)
    
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    category: Mapped["EquipmentCategory"] = relationship("EquipmentCategory", back_populates="types")
    models: Mapped[list["EquipmentModel"]] = relationship("EquipmentModel", back_populates="equipment_type")

class EquipmentModel(Base):
    __tablename__ = "equipment_models"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("organizations.id"), nullable=True)
    type_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("equipment_types.id"), nullable=False)
    manufacturer: Mapped[str] = mapped_column(String, nullable=False)
    model_name: Mapped[str] = mapped_column(String, nullable=False)
    
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    equipment_type: Mapped["EquipmentType"] = relationship("EquipmentType", back_populates="models")
    assets: Mapped[list["Asset"]] = relationship("Asset", back_populates="equipment_model")
