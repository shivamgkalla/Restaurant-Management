from sqlalchemy.orm import Session
from app.models.tax_config import TaxConfig


class TaxConfigRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> list[TaxConfig]:
        return self.db.query(TaxConfig).filter(TaxConfig.is_active == True).all()

    def get_by_id(self, tax_config_id: int) -> TaxConfig:
        return self.db.query(TaxConfig).filter(TaxConfig.id == tax_config_id).first()

    def get_by_name(self, name: str) -> TaxConfig:
        return self.db.query(TaxConfig).filter(TaxConfig.name == name).first()

    def get_default(self) -> TaxConfig:
        return self.db.query(TaxConfig).filter(
            TaxConfig.is_default == True,
            TaxConfig.is_active == True
        ).first()

    def unset_all_defaults(self) -> None:
        self.db.query(TaxConfig).filter(TaxConfig.is_default == True).update(
            {"is_default": False}
        )

    def create(self, tax_config: TaxConfig) -> TaxConfig:
        self.db.add(tax_config)
        self.db.commit()
        self.db.refresh(tax_config)
        return tax_config

    def update(self, tax_config: TaxConfig) -> TaxConfig:
        self.db.commit()
        self.db.refresh(tax_config)
        return tax_config

    def delete(self, tax_config: TaxConfig) -> None:
        tax_config.is_active = False
        self.db.commit()
