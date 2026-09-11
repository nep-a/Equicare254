from typing import Any, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[schemas.Asset])
def read_assets(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    organization_id: str = Depends(deps.enforce_tenant_isolation),
) -> Any:
    """
    Retrieve assets.
    """
    assets = crud.asset.get_multi(db, skip=skip, limit=limit, organization_id=UUID(organization_id))
    return assets

@router.post("/", response_model=schemas.Asset)
def create_asset(
    *,
    db: Session = Depends(deps.get_db),
    asset_in: schemas.AssetCreate,
    organization_id: str = Depends(deps.enforce_tenant_isolation),
) -> Any:
    """
    Create new asset.
    """
    asset = crud.asset.create(db=db, obj_in=asset_in, organization_id=UUID(organization_id))
    return asset

@router.get("/{id}", response_model=schemas.Asset)
def read_asset(
    *,
    db: Session = Depends(deps.get_db),
    id: UUID,
    organization_id: str = Depends(deps.enforce_tenant_isolation),
) -> Any:
    """
    Get asset by ID.
    """
    asset = crud.asset.get(db=db, id=id, organization_id=UUID(organization_id))
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    return asset

@router.put("/{id}", response_model=schemas.Asset)
def update_asset(
    *,
    db: Session = Depends(deps.get_db),
    id: UUID,
    asset_in: schemas.AssetUpdate,
    organization_id: str = Depends(deps.enforce_tenant_isolation),
) -> Any:
    """
    Update an asset.
    """
    asset = crud.asset.get(db=db, id=id, organization_id=UUID(organization_id))
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    asset = crud.asset.update(db=db, db_obj=asset, obj_in=asset_in)
    return asset

@router.delete("/{id}", response_model=schemas.Asset)
def delete_asset(
    *,
    db: Session = Depends(deps.get_db),
    id: UUID,
    organization_id: str = Depends(deps.enforce_tenant_isolation),
) -> Any:
    """
    Delete an asset.
    """
    asset = crud.asset.get(db=db, id=id, organization_id=UUID(organization_id))
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    asset = crud.asset.remove(db=db, id=id, organization_id=UUID(organization_id))
    return asset
