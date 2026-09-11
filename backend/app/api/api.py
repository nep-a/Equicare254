from fastapi import APIRouter

from app.api.endpoints import auth, assets, facilities, work_orders, users

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(assets.router, prefix="/assets", tags=["assets"])
api_router.include_router(facilities.router, prefix="/facilities", tags=["facilities"])
api_router.include_router(work_orders.router, prefix="/work-orders", tags=["work_orders"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
