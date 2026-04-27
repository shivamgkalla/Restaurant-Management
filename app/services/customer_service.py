from typing import Optional

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.customer import Customer, CustomerType
from app.repositories.customer_repo import CustomerRepository
from app.schemas.customer import CustomerCreateRequest, CustomerUpdateRequest


class CustomerService:
    def __init__(self, db: Session):
        self.repo = CustomerRepository(db)

    # ── Helpers ───────────────────────────────────────────────────────

    def _generate_unique_customer_id(self) -> str:
        for _ in range(10):
            candidate = Customer.generate_customer_id()
            if not self.repo.customer_id_exists(candidate):
                return candidate
        raise RuntimeError("Could not generate a unique customer ID after 10 attempts.")

    def _classify_customer_type(self, phone: str) -> CustomerType:
        existing = self.repo.get_by_phone(phone)
        return CustomerType.regular if existing else CustomerType.new

    # ── CRUD ──────────────────────────────────────────────────────────

    def create_customer(self, payload: CustomerCreateRequest) -> Customer:
        if self.repo.get_by_phone(payload.phone):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"A customer with phone '{payload.phone}' already exists.",
            )
        if payload.email and self.repo.get_by_email(payload.email):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"A customer with email '{payload.email}' already exists.",
            )

        customer = Customer(
            customer_id=self._generate_unique_customer_id(),
            name=payload.name,
            phone=payload.phone,
            email=payload.email,
            address=payload.address,
            date_of_birth=payload.date_of_birth,
            notes=payload.notes,
            customer_type=self._classify_customer_type(payload.phone),
        )
        return self.repo.create(customer)

    def get_customer_by_id(self, id: int) -> Customer:
        customer = self.repo.get_by_id(id)
        if not customer:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Customer with id {id} not found.",
            )
        return customer

    def get_all_customers(
        self,
        skip: int = 0,
        limit: int = 50,
        customer_type: Optional[str] = None,
        search: Optional[str] = None,
    ) -> tuple[list[Customer], int]:
        return self.repo.get_all(
            skip=skip, limit=limit, customer_type=customer_type, search=search
        )

    def update_customer(self, id: int, payload: CustomerUpdateRequest) -> Customer:
        customer = self.get_customer_by_id(id)

        if payload.email and payload.email != customer.email:
            if self.repo.get_by_email(payload.email):
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail=f"Email '{payload.email}' is already in use.",
                )

        for field, value in payload.model_dump(exclude_unset=True).items():
            setattr(customer, field, value)

        return self.repo.update(customer)

    def toggle_status(self, id: int) -> Customer:
        """Activate an inactive customer OR deactivate an active one."""
        # fetch regardless of current is_active so we can reactivate too
        customer = self.repo.get_by_id_any_status(id)
        if not customer:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Customer with id {id} not found.",
            )
        return self.repo.set_active_status(customer, not customer.is_active)

    def search_by_phone(self, phone: str) -> Customer:
        customer = self.repo.get_by_phone(phone)
        if not customer or not customer.is_active:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No active customer found with phone '{phone}'.",
            )
        return customer