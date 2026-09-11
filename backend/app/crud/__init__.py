from .base import CRUDBase
from app.db.models.asset import Asset
from app.db.models.facility import Facility
from app.db.models.work_order import WorkOrder
from app.schemas.asset import AssetCreate, AssetUpdate
from app.schemas.facility import FacilityCreate, FacilityUpdate
from app.schemas.work_order import WorkOrderCreate, WorkOrderUpdate

class CRUDAsset(CRUDBase[Asset, AssetCreate, AssetUpdate]):
    pass

class CRUDFacility(CRUDBase[Facility, FacilityCreate, FacilityUpdate]):
    pass

class CRUDWorkOrder(CRUDBase[WorkOrder, WorkOrderCreate, WorkOrderUpdate]):
    pass

asset = CRUDAsset(Asset)
facility = CRUDFacility(Facility)
work_order = CRUDWorkOrder(WorkOrder)
