from typing import Optional, Dict, Any
from uuid import UUID
from datetime import date, datetime
from pydantic import BaseModel, ConfigDict

class AssetBase(BaseModel):
    model_id: UUID
    asset_number: str
    serial_number: Optional[str] = None
    qr_code: str
    status: Optional[str] = "Operational"
    risk_level: Optional[str] = "Moderate"
    acquisition_date: Optional[date] = None
    commissioning_date: Optional[date] = None
    purchase_cost: Optional[float] = None
    expected_useful_life_years: Optional[float] = None
    custom_attributes: Optional[Dict[str, Any]] = None

class AssetCreate(AssetBase):
    pass

class AssetUpdate(BaseModel):
    model_id: Optional[UUID] = None
    asset_number: Optional[str] = None
    serial_number: Optional[str] = None
    qr_code: Optional[str] = None
    status: Optional[str] = None
    risk_level: Optional[str] = None
    acquisition_date: Optional[date] = None
    commissioning_date: Optional[date] = None
    purchase_cost: Optional[float] = None
    expected_useful_life_years: Optional[float] = None
    custom_attributes: Optional[Dict[str, Any]] = None

class AssetInDBBase(AssetBase):
    id: UUID
    organization_id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class Asset(AssetInDBBase):
    pass
