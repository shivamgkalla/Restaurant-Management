from app.database import SessionLocal
from app.models.role import Role
from app.models.user import Staff
from app.core.security import hash_password


def seed():
    db = SessionLocal()
    try:
        # Seed roles
        roles_data = [
            {"name": "admin",   "description": "Full system access"},
            {"name": "captain", "description": "Order creation and table management"},
            {"name": "cashier", "description": "Billing and payment collection"},
            {"name": "manager", "description": "Reports and discount approval"},
            {"name": "kitchen", "description": "View KOTs and update status"},
        ]

        for r in roles_data:
            if not db.query(Role).filter(Role.name == r["name"]).first():
                db.add(Role(**r))

        db.commit()
        print("✓ Roles seeded!")

        # Seed admin staff
        admin_role = db.query(Role).filter(Role.name == "admin").first()
        if not db.query(Staff).filter(Staff.username == "admin").first():
            admin = Staff(
                employee_id="EMP001",
                name="Super Admin",
                phone="9999999999",
                email="admin@restro.com",
                role_id=admin_role.id,
                username="admin",
                password_hash=hash_password("admin@123"),
                is_active=True,
            )
            db.add(admin)
            db.commit()
            print("✓ Admin user seeded!")
            print("   Username: admin")
            print("   Password: admin@123")
        else:
            print("Admin already exists, skipping.")

    except Exception as e:
        print(f"Error during seeding: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    seed()
