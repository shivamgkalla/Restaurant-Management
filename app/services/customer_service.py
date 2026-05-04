from typing import Optional

from sqlalchemy.orm import Session

from app.models.customer import Customer, CustomerType
from app.repositories.customer_repo import CustomerRepository
from app.schemas.customer import CustomerCreateRequest, CustomerUpdateRequest
from app.core.custom_response import CustomResponse
from app.core.http_constants import HttpConstants

C = HttpConstants.HttpResponseCodes


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

    def create_customer(self, payload: CustomerCreateRequest) -> CustomResponse:
        if self.repo.get_by_phone(payload.phone):
            return CustomResponse(C.CONFLICT, f"A customer with phone '{payload.phone}' already exists.")

        if payload.email and self.repo.get_by_email(payload.email):
            return CustomResponse(C.CONFLICT, f"A customer with email '{payload.email}' already exists.")

        customer = Customer(
            customer_id   = self._generate_unique_customer_id(),
            name          = payload.name,
            phone         = payload.phone,
            email         = payload.email,
            address       = payload.address,
            date_of_birth = payload.date_of_birth,
            notes         = payload.notes,
           customer_type=payload.customer_type,
        )
        customer = self.repo.create(customer)
        return CustomResponse(C.CREATED, "Customer created successfully", data=customer)

    def get_customer_by_id(self, id: int) -> CustomResponse:
        customer = self.repo.get_by_id(id)
        if not customer:
            return CustomResponse(C.NOT_FOUND, f"Customer with id {id} not found.")
        return CustomResponse(C.OK, "Customer fetched successfully", data=customer)

    def get_all_customers(
        self,
        page: int = 1,
        limit: int = 10,
        customer_type: Optional[str] = None,
        search: Optional[str] = None,
    ) -> CustomResponse:
        records, total = self.repo.get_all(page=page, limit=limit, customer_type=customer_type, search=search)
        return CustomResponse(
            C.OK,
            "Customers fetched successfully",
            data=records,
            meta={
                "total":       total,
                "page":        page,
                "limit":       limit,
                "total_pages": (total + limit - 1) // limit,
                "has_next":    page * limit < total,
                "has_prev":    page > 1,
            },
        )

    def update_customer(self, id: int, payload: CustomerUpdateRequest) -> CustomResponse:
        customer = self.repo.get_by_id(id)
        if not customer:
            return CustomResponse(C.NOT_FOUND, f"Customer with id {id} not found.")

        if payload.email and payload.email != customer.email:
            if self.repo.get_by_email(payload.email):
                return CustomResponse(C.CONFLICT, f"Email '{payload.email}' is already in use.")

        for field, value in payload.model_dump(exclude_unset=True).items():
            setattr(customer, field, value)

        customer = self.repo.update(customer)
        return CustomResponse(C.OK, "Customer updated successfully", data=customer)

    def toggle_status(self, id: int) -> CustomResponse:
        customer = self.repo.get_by_id_any_status(id)
        if not customer:
            return CustomResponse(C.NOT_FOUND, f"Customer with id {id} not found.")
        customer = self.repo.set_active_status(customer, not customer.is_active)
        status_msg = "activated" if customer.is_active else "deactivated"
        return CustomResponse(C.OK, f"Customer {status_msg} successfully", data=customer)

    def search_by_phone(self, phone: str) -> CustomResponse:
        customer = self.repo.get_by_phone(phone)
        if not customer or not customer.is_active:
            return CustomResponse(C.NOT_FOUND, f"No active customer found with phone '{phone}'.")
        return CustomResponse(C.OK, "Customer fetched successfully", data=customer)
    
    def delete_customer(self, customer_id: int) -> CustomResponse:
      customer = self.repo.get_by_id(customer_id)
      if not customer:
        return CustomResponse(C.NOT_FOUND, "Customer not found")
      self.repo.delete(customer)
      return CustomResponse(C.OK, "Customer deleted successfully")