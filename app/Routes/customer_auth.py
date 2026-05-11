from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.customer_auth import CustomerRegisterRequest, CustomerLoginRequest
from app.services.customer_auth_service import CustomerAuthService

router = APIRouter(prefix="/customer-auth", tags=["Customer Auth"])


@router.post("/register")
def register(data: CustomerRegisterRequest, db: Session = Depends(get_db)):
    return CustomerAuthService(db).register(data.model_dump()).to_json()


@router.post("/login")
def login(data: CustomerLoginRequest, db: Session = Depends(get_db)):
    return CustomerAuthService(db).login(data.model_dump()).to_json()
