from typing import Optional

from sqlalchemy.orm import Session

from app.models.customer import Customer


class CustomerRepository:
    def __init__(self, db: Session):
        self.db = db

    # ── Read ──────────────────────────────────────────────────────────

    def get_by_id(self, customer_id: int) -> Optional[Customer]:
        return (
            self.db.query(Customer)
            .filter(Customer.id == customer_id, Customer.is_active == True)
            .first()
        )

    def get_by_id_any_status(self, customer_id: int) -> Optional[Customer]:
        """Used for activation — fetches even inactive customers."""
        return self.db.query(Customer).filter(Customer.id == customer_id).first()

    def get_by_customer_id(self, customer_id: str) -> Optional[Customer]:
        return (
            self.db.query(Customer)
            .filter(Customer.customer_id == customer_id, Customer.is_active == True)
            .first()
        )

    def get_by_phone(self, phone: str) -> Optional[Customer]:
        return self.db.query(Customer).filter(Customer.phone == phone).first()

    def get_by_email(self, email: str) -> Optional[Customer]:
        return self.db.query(Customer).filter(Customer.email == email).first()

    def get_all(
        self,
        skip: int = 0,
        limit: int = 50,
        customer_type: Optional[str] = None,
        search: Optional[str] = None,
    ) -> tuple[list[Customer], int]:
        query = self.db.query(Customer).filter(Customer.is_active == True)

        if customer_type:
            query = query.filter(Customer.customer_type == customer_type)

        if search:
            pattern = f"%{search}%"
            query = query.filter(
                Customer.name.ilike(pattern)
                | Customer.phone.ilike(pattern)
                | Customer.customer_id.ilike(pattern)   # ← search by CUST-XXXXXXXX
            )

        total = query.count()
        records = (
            query.order_by(Customer.registered_at.desc())
            .offset(skip)
            .limit(limit)
            .all()
        )
        return records, total

    def customer_id_exists(self, customer_id: str) -> bool:
        return (
            self.db.query(Customer)
            .filter(Customer.customer_id == customer_id)
            .first()
        ) is not None

    # ── Write ─────────────────────────────────────────────────────────

    def create(self, customer: Customer) -> Customer:
        self.db.add(customer)
        self.db.commit()
        self.db.refresh(customer)
        return customer

    def update(self, customer: Customer) -> Customer:
        self.db.commit()
        self.db.refresh(customer)
        return customer

    def set_active_status(self, customer: Customer, is_active: bool) -> Customer:
        """Handles both activation and deactivation."""
        customer.is_active = is_active
        self.db.commit()
        self.db.refresh(customer)
        return customer