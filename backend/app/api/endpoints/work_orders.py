from typing import Any, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[schemas.WorkOrder])
def read_work_orders(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    organization_id: str = Depends(deps.enforce_tenant_isolation),
) -> Any:
    """
    Retrieve work orders.
    """
    work_orders = crud.work_order.get_multi(db, skip=skip, limit=limit, organization_id=UUID(organization_id))
    return work_orders

@router.post("/", response_model=schemas.WorkOrder)
def create_work_order(
    *,
    db: Session = Depends(deps.get_db),
    work_order_in: schemas.WorkOrderCreate,
    organization_id: str = Depends(deps.enforce_tenant_isolation),
) -> Any:
    """
    Create new work order.
    """
    work_order = crud.work_order.create(db=db, obj_in=work_order_in, organization_id=UUID(organization_id))
    return work_order

@router.get("/{id}", response_model=schemas.WorkOrder)
def read_work_order(
    *,
    db: Session = Depends(deps.get_db),
    id: UUID,
    organization_id: str = Depends(deps.enforce_tenant_isolation),
) -> Any:
    """
    Get work order by ID.
    """
    work_order = crud.work_order.get(db=db, id=id, organization_id=UUID(organization_id))
    if not work_order:
        raise HTTPException(status_code=404, detail="Work order not found")
    return work_order

@router.put("/{id}", response_model=schemas.WorkOrder)
def update_work_order(
    *,
    db: Session = Depends(deps.get_db),
    id: UUID,
    work_order_in: schemas.WorkOrderUpdate,
    organization_id: str = Depends(deps.enforce_tenant_isolation),
) -> Any:
    """
    Update a work order.
    """
    work_order = crud.work_order.get(db=db, id=id, organization_id=UUID(organization_id))
    if not work_order:
        raise HTTPException(status_code=404, detail="Work order not found")
    work_order = crud.work_order.update(db=db, db_obj=work_order, obj_in=work_order_in)
    return work_order

@router.delete("/{id}", response_model=schemas.WorkOrder)
def delete_work_order(
    *,
    db: Session = Depends(deps.get_db),
    id: UUID,
    organization_id: str = Depends(deps.enforce_tenant_isolation),
) -> Any:
    """
    Delete a work order.
    """
    work_order = crud.work_order.get(db=db, id=id, organization_id=UUID(organization_id))
    if not work_order:
        raise HTTPException(status_code=404, detail="Work order not found")
    work_order = crud.work_order.remove(db=db, id=id, organization_id=UUID(organization_id))
    return work_order
