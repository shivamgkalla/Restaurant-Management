from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.core.security import hash_password, verify_password, create_customer_access_token
from app.core.custom_response import CustomResponse
from app.core.http_constants import HttpConstants

C = HttpConstants.HttpResponseCodes


class CustomerAuthService:
    def __init__(self, db: Session):
        self.db = db

    def register(self, data: dict) -> CustomResponse:
        phone = data["phone"]
        existing = self.db.query(Customer).filter(Customer.phone == phone).first()
        if existing:
            if existing.password_hash:
                return CustomResponse(C.CONFLICT, "A customer account with this phone already exists")
            # Staff-created customer — attach password to the existing record
            existing.password_hash = hash_password(data["password"])
            existing.name = data.get("name", existing.name)
            self.db.commit()
            self.db.refresh(existing)
            token = create_customer_access_token({"sub": str(existing.id)})
            return CustomResponse(C.OK, "Account set up successfully", {
                "access_token": token,
                "token_type": "bearer",
                "customer_id": existing.id,
                "name": existing.name,
                "phone": existing.phone,
            })

        customer = Customer(
            customer_id=Customer.generate_customer_id(),
            name=data["name"],
            phone=phone,
            password_hash=hash_password(data["password"]),
        )
        self.db.add(customer)
        self.db.commit()
        self.db.refresh(customer)
        token = create_customer_access_token({"sub": str(customer.id)})
        return CustomResponse(C.CREATED, "Account created successfully", {
            "access_token": token,
            "token_type": "bearer",
            "customer_id": customer.id,
            "name": customer.name,
            "phone": customer.phone,
        })

    def login(self, data: dict) -> CustomResponse:
        customer = self.db.query(Customer).filter(Customer.phone == data["phone"]).first()
        if not customer or not customer.password_hash:
            return CustomResponse(C.UNAUTHORIZED, "Invalid phone or password")
        if not verify_password(data["password"], customer.password_hash):
            return CustomResponse(C.UNAUTHORIZED, "Invalid phone or password")
        if not customer.is_active:
            return CustomResponse(C.FORBIDDEN, "Account is deactivated")
        token = create_customer_access_token({"sub": str(customer.id)})
        return CustomResponse(C.OK, "Login successful", {
            "access_token": token,
            "token_type": "bearer",
            "customer_id": customer.id,
            "name": customer.name,
            "phone": customer.phone,
        })
