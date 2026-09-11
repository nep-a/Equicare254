import pytest
from app.db.models.organization import Organization
from app.db.models.equipment import EquipmentCategory, EquipmentType, EquipmentModel
from app.db.models.asset import Asset
from datetime import date

def test_create_asset(db_session):
    # 1. Setup base prerequisites
    org = Organization(name="Test Hospital")
    db_session.add(org)
    db_session.commit()
    
    cat = EquipmentCategory(name="Testing")
    db_session.add(cat)
    db_session.commit()
    
    etype = EquipmentType(category_id=cat.id, name="Test Type")
    db_session.add(etype)
    db_session.commit()
    
    model = EquipmentModel(type_id=etype.id, manufacturer="Test Corp", model_name="X-100")
    db_session.add(model)
    db_session.commit()
    
    # 2. Test Asset Creation
    asset = Asset(
        organization_id=org.id,
        model_id=model.id,
        asset_number="TEST-001",
        qr_code="QR-001",
        status="Operational",
        acquisition_date=date(2026, 1, 1)
    )
    db_session.add(asset)
    db_session.commit()
    db_session.refresh(asset)
    
    assert asset.id is not None
    assert asset.asset_number == "TEST-001"
    assert asset.organization_id == org.id

def test_tenant_isolation(db_session):
    """Verify that assets are properly linked to specific organizations"""
    org1 = Organization(name="Tenant A")
    org2 = Organization(name="Tenant B")
    db_session.add_all([org1, org2])
    db_session.commit()
    
    cat = EquipmentCategory(name="Testing")
    db_session.add(cat)
    db_session.commit()
    
    etype = EquipmentType(category_id=cat.id, name="Test Type")
    db_session.add(etype)
    db_session.commit()
    
    model = EquipmentModel(type_id=etype.id, manufacturer="Test Corp", model_name="X-100")
    db_session.add(model)
    db_session.commit()
    
    # Asset for Tenant A
    asset_a = Asset(organization_id=org1.id, model_id=model.id, asset_number="A-001", qr_code="QA-001")
    # Asset for Tenant B
    asset_b = Asset(organization_id=org2.id, model_id=model.id, asset_number="B-001", qr_code="QB-001")
    
    db_session.add_all([asset_a, asset_b])
    db_session.commit()
    
    # Verify isolation queries
    tenant_a_assets = db_session.query(Asset).filter(Asset.organization_id == org1.id).all()
    assert len(tenant_a_assets) == 1
    assert tenant_a_assets[0].asset_number == "A-001"
