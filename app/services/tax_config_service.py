from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.repositories.tax_config_repo import TaxConfigRepository
from app.models.tax_config import TaxConfig


class TaxConfigService:
    def __init__(self, db: Session):
        self.repo = TaxConfigRepository(db)

    def get_all(self) -> list[TaxConfig]:
        return self.repo.get_all()

    def get_by_id(self, tax_config_id: int) -> TaxConfig:
        config = self.repo.get_by_id(tax_config_id)
        if not config:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tax config not found")
        return config

    def get_default(self) -> TaxConfig:
        config = self.repo.get_default()
        if not config:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No default tax config set. Please configure one in admin settings."
            )
        return config

    def create(self, data: dict) -> TaxConfig:
        if self.repo.get_by_name(data["name"]):
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A tax config with this name already exists")

        if data.get("is_default"):
            self.repo.unset_all_defaults()

        return self.repo.create(TaxConfig(
            name=data["name"],
            total_rate=data["total_rate"],
            cgst_rate=data["cgst_rate"],
            sgst_rate=data["sgst_rate"],
            igst_rate=data.get("igst_rate", 0.0),
            is_igst_mode=data.get("is_igst_mode", False),
            is_inclusive=data.get("is_inclusive", False),
            is_default=data.get("is_default", False),
        ))

    def update(self, tax_config_id: int, data: dict) -> TaxConfig:
        config = self.get_by_id(tax_config_id)

        if "name" in data and data["name"] != config.name:
            if self.repo.get_by_name(data["name"]):
                raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A tax config with this name already exists")

        # Merge incoming values with the current saved values before checking rates.
        # Partial updates skip the schema-level validation, so we re-validate
        # the full final state here to catch any invalid rate combinations.
        new_total = data.get("total_rate", config.total_rate)
        new_cgst = data.get("cgst_rate", config.cgst_rate)
        new_sgst = data.get("sgst_rate", config.sgst_rate)
        new_igst = data.get("igst_rate", config.igst_rate)
        new_igst_mode = data.get("is_igst_mode", config.is_igst_mode)

        if new_igst_mode:
            if round(new_igst, 4) != round(new_total, 4):
                raise HTTPException(status_code=400, detail="igst_rate must equal total_rate when is_igst_mode is True")
        else:
            if round(new_cgst + new_sgst, 4) != round(new_total, 4):
                raise HTTPException(status_code=400, detail="cgst_rate + sgst_rate must equal total_rate")

        if any(r < 0 for r in [new_total, new_cgst, new_sgst, new_igst]):
            raise HTTPException(status_code=400, detail="Tax rates cannot be negative")

        if data.get("is_default") and not config.is_default:
            self.repo.unset_all_defaults()

        for field in ["name", "total_rate", "cgst_rate", "sgst_rate", "igst_rate",
                      "is_igst_mode", "is_inclusive", "is_default", "is_active"]:
            if field in data:
                setattr(config, field, data[field])

        return self.repo.update(config)

    def delete(self, tax_config_id: int) -> dict:
        config = self.get_by_id(tax_config_id)

        if config.is_default:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot delete the default tax config. Assign another default first."
            )
        # config.categories includes inactive categories too (see TaxConfig model).
        # We block deletion if any category — active or not — is linked,
        # to avoid leaving those categories without a valid tax config if they get reactivated.
        if config.categories:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot delete tax config assigned to categories. Reassign those categories first."
            )

        self.repo.delete(config)
        return {"message": "Tax config deleted successfully"}
