from app.db.database import Base
from app.db.models.organization import Organization
from app.db.models.facility import Facility
from app.db.models.location import Department, Location
from app.db.models.equipment import EquipmentCategory, EquipmentType, EquipmentModel
from app.db.models.asset import Asset, AssetLocationHistory
from app.db.models.user import User, Role
from app.db.models.audit import AuditLog
from app.db.models.work_order import WorkOrder, WorkOrderTask
from app.db.models.maintenance import MaintenancePlan, MaintenanceChecklist, ChecklistItem
from app.db.models.calibration import Calibration
from app.db.models.document import Document
from app.db.models.vendor import Vendor, Contract, Warranty
from app.db.models.inventory import Part, InventoryLevel
from app.db.models.procurement import ProcurementRequest
from app.db.models.lifecycle import DisposalRecord
from app.db.models.auth import RefreshToken
from app.db.models.marketing import ContactSubmission, JobPosting

# For Alembic to auto-generate migrations, it needs to import Base from this file.
# By importing all models here, Alembic detects all tables when importing Base from here.
