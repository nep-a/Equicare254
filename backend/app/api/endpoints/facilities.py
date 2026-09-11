from typing import Any, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[schemas.Facility])
def read_facilities(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    organization_id: str = Depends(deps.enforce_tenant_isolation),
) -> Any:
    """
    Retrieve facilities.
    """
    facilities = crud.facility.get_multi(db, skip=skip, limit=limit, organization_id=UUID(organization_id))
    return facilities

@router.post("/", response_model=schemas.Facility)
def create_facility(
    *,
    db: Session = Depends(deps.get_db),
    facility_in: schemas.FacilityCreate,
    organization_id: str = Depends(deps.enforce_tenant_isolation),
) -> Any:
    """
    Create new facility.
    """
    facility = crud.facility.create(db=db, obj_in=facility_in, organization_id=UUID(organization_id))
    return facility

@router.get("/{id}", response_model=schemas.Facility)
def read_facility(
    *,
    db: Session = Depends(deps.get_db),
    id: UUID,
    organization_id: str = Depends(deps.enforce_tenant_isolation),
) -> Any:
    """
    Get facility by ID.
    """
    facility = crud.facility.get(db=db, id=id, organization_id=UUID(organization_id))
    if not facility:
        raise HTTPException(status_code=404, detail="Facility not found")
    return facility

@router.put("/{id}", response_model=schemas.Facility)
def update_facility(
    *,
    db: Session = Depends(deps.get_db),
    id: UUID,
    facility_in: schemas.FacilityUpdate,
    organization_id: str = Depends(deps.enforce_tenant_isolation),
) -> Any:
    """
    Update a facility.
    """
    facility = crud.facility.get(db=db, id=id, organization_id=UUID(organization_id))
    if not facility:
        raise HTTPException(status_code=404, detail="Facility not found")
    facility = crud.facility.update(db=db, db_obj=facility, obj_in=facility_in)
    return facility

@router.delete("/{id}", response_model=schemas.Facility)
def delete_facility(
    *,
    db: Session = Depends(deps.get_db),
    id: UUID,
    organization_id: str = Depends(deps.enforce_tenant_isolation),
) -> Any:
    """
    Delete a facility.
    """
    facility = crud.facility.get(db=db, id=id, organization_id=UUID(organization_id))
    if not facility:
        raise HTTPException(status_code=404, detail="Facility not found")
    facility = crud.facility.remove(db=db, id=id, organization_id=UUID(organization_id))
    return facility
