import os
import sys
import uuid
import random
from datetime import datetime, timedelta, date

# Add the backend root directory to the python path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.db.database import SessionLocal, Base, engine
from app.db.models.organization import Organization
from app.db.models.facility import Facility
from app.db.models.location import Department, Location
from app.db.models.user import User, Role
from app.db.models.equipment import EquipmentCategory, EquipmentType, EquipmentModel
from app.db.models.asset import Asset, AssetLocationHistory
from app.db.models.work_order import WorkOrder
from app.core.security import get_password_hash

def seed_database():
    print("Initializing Database Seed Process...")
    
    # Normally we wouldn't drop tables in production, but this is a seed script for dev
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        print("Creating Core Organizations and Facilities...")
        
        # 1. Organization
        org = Organization(
            name="Ministry of Health Kenya - Pilot",
            license_tier="Enterprise",
            onboarding_status="Active"
        )
        db.add(org)
        db.commit()
        db.refresh(org)
        
        # 2. Roles
        admin_role = Role(name="Hospital Administrator", permissions=["*"], organization_id=org.id)
        engineer_role = Role(name="Clinical Engineer", permissions=["assets.view", "work_orders.edit"], organization_id=org.id)
        db.add_all([admin_role, engineer_role])
        db.commit()
        
        # 3. Users
        admin_user = User(
            organization_id=org.id,
            role_id=admin_role.id,
            first_name="Jane",
            last_name="Kamau",
            email="admin@moh.go.ke",
            hashed_password=get_password_hash("password123")
        )
        engineer_user = User(
            organization_id=org.id,
            role_id=engineer_role.id,
            first_name="Victor",
            last_name="Ochieng",
            email="vochieng@moh.go.ke",
            hashed_password=get_password_hash("password123")
        )
        db.add_all([admin_user, engineer_user])
        
        # 4. Facilities
        facility_nrb = Facility(
            organization_id=org.id,
            name="Nairobi National Referral Hospital",
            facility_type="Referral Hospital",
            region="Nairobi",
            county="Nairobi",
            contact_email="nrb@moh.go.ke"
        )
        facility_coast = Facility(
            organization_id=org.id,
            name="Coast General Hospital",
            facility_type="General Hospital",
            region="Coast",
            county="Mombasa"
        )
        db.add_all([facility_nrb, facility_coast])
        db.commit()
        
        # 5. Departments & Locations
        icu_dept = Department(organization_id=org.id, facility_id=facility_nrb.id, name="Intensive Care Unit", code="ICU")
        radio_dept = Department(organization_id=org.id, facility_id=facility_nrb.id, name="Radiology", code="RAD")
        db.add_all([icu_dept, radio_dept])
        db.commit()
        
        icu_bed_1 = Location(organization_id=org.id, facility_id=facility_nrb.id, department_id=icu_dept.id, name="ICU Bed 1")
        radio_room_a = Location(organization_id=org.id, facility_id=facility_nrb.id, department_id=radio_dept.id, name="X-Ray Room A")
        db.add_all([icu_bed_1, radio_room_a])
        db.commit()

        print("Creating Equipment Catalog & Assets...")
        
        # 6. Equipment Catalog
        cat_imaging = EquipmentCategory(name="Imaging")
        cat_life_support = EquipmentCategory(name="Life Support")
        db.add_all([cat_imaging, cat_life_support])
        db.commit()
        
        type_mri = EquipmentType(category_id=cat_imaging.id, name="MRI Scanner")
        type_vent = EquipmentType(category_id=cat_life_support.id, name="Mechanical Ventilator")
        db.add_all([type_mri, type_vent])
        db.commit()
        
        model_mri = EquipmentModel(type_id=type_mri.id, manufacturer="GE Healthcare", model_name="Optima MR450w")
        model_vent = EquipmentModel(type_id=type_vent.id, manufacturer="Dräger", model_name="Evita V500")
        db.add_all([model_mri, model_vent])
        db.commit()
        
        # 7. Physical Assets
        asset_1 = Asset(
            organization_id=org.id,
            model_id=model_mri.id,
            asset_number="MOH-NRB-MRI-001",
            serial_number="GE-998822",
            qr_code="QR-MRI-001",
            status="Operational",
            risk_level="High",
            acquisition_date=date(2023, 5, 10),
            purchase_cost=150000000.00 # Ksh
        )
        
        asset_2 = Asset(
            organization_id=org.id,
            model_id=model_vent.id,
            asset_number="MOH-NRB-VENT-012",
            serial_number="DRG-V500-112",
            qr_code="QR-VENT-012",
            status="Maintenance Required",
            risk_level="High",
            acquisition_date=date(2025, 1, 15),
            purchase_cost=3500000.00
        )
        db.add_all([asset_1, asset_2])
        db.commit()
        
        # 8. Asset Locations
        loc_hist_1 = AssetLocationHistory(organization_id=org.id, asset_id=asset_1.id, location_id=radio_room_a.id, is_current=True)
        loc_hist_2 = AssetLocationHistory(organization_id=org.id, asset_id=asset_2.id, location_id=icu_bed_1.id, is_current=True)
        db.add_all([loc_hist_1, loc_hist_2])
        db.commit()
        
        # 9. Work Orders
        wo_1 = WorkOrder(
            organization_id=org.id,
            asset_id=asset_2.id,
            title="Scheduled Preventive Maintenance - 6 Months",
            description="Perform standard 6-month PM kit replacement and sensor calibration.",
            priority="Medium",
            status="In Progress",
            work_type="Preventive",
            assigned_to_id=engineer_user.id,
            reported_by_id=admin_user.id
        )
        db.add(wo_1)
        db.commit()
        
        print("Database seeding completed successfully!")
        print(f"Test Admin Login -> Email: {admin_user.email} | Password: password123")
        
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
