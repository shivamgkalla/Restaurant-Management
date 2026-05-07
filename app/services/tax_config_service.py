from sqlalchemy.orm import Session
from app.core.custom_response import CustomResponse
from app.core.http_constants import HttpConstants
from app.repositories.tax_config_repo import TaxConfigRepository
from app.models.tax_config import TaxConfig

C = HttpConstants.HttpResponseCodes


class TaxConfigService:
    def __init__(self, db: Session):
        self.repo = TaxConfigRepository(db)

    def _get_config(self, tax_config_id: int):
        return self.repo.get_by_id(tax_config_id)

    def get_all(self) -> CustomResponse:
        return CustomResponse(C.OK, "Tax configs fetched successfully", data=self.repo.get_all())

    def get_by_id(self, tax_config_id: int) -> CustomResponse:
        config = self._get_config(tax_config_id)
        if not config:
            return CustomResponse(C.NOT_FOUND, "Tax config not found")
        return CustomResponse(C.OK, "Tax config fetched successfully", data=config)

    def get_default(self) -> CustomResponse:
        config = self.repo.get_default()
        if not config:
            return CustomResponse(C.NOT_FOUND, "No default tax config set. Please configure one in admin settings.")
        return CustomResponse(C.OK, "Default tax config fetched successfully", data=config)

    def create(self, data: dict) -> CustomResponse:
        if self.repo.get_by_name(data["name"]):
            return CustomResponse(C.CONFLICT, "A tax config with this name already exists")

        if data.get("is_default"):
            self.repo.unset_all_defaults()

        config = self.repo.create(TaxConfig(
            name=data["name"],
            total_rate=data["total_rate"],
            cgst_rate=data["cgst_rate"],
            sgst_rate=data["sgst_rate"],
            igst_rate=data.get("igst_rate", 0.0),
            is_igst_mode=data.get("is_igst_mode", False),
            is_inclusive=data.get("is_inclusive", False),
            is_default=data.get("is_default", False),
        ))
        return CustomResponse(C.CREATED, "Tax config created successfully", data=config)

    def update(self, tax_config_id: int, data: dict) -> CustomResponse:
        config = self._get_config(tax_config_id)
        if not config:
            return CustomResponse(C.NOT_FOUND, "Tax config not found")

        if "name" in data and data["name"] != config.name:
            if self.repo.get_by_name(data["name"]):
                return CustomResponse(C.CONFLICT, "A tax config with this name already exists")

        # Guard: do not allow deactivating the current default without designating a new one first.
        # If this config is the default and the update sets is_active=False, the next bill
        # generation would hit a 500 ("No default tax config set").
        if data.get("is_active") is False and config.is_default:
            return CustomResponse(C.BAD_REQUEST, "Cannot deactivate the default tax config. Assign another default first.")

        # Same protection for flipping is_default off without naming a replacement —
        # would leave the system with no default and break bill generation.
        if data.get("is_default") is False and config.is_default:
            return CustomResponse(C.BAD_REQUEST, "Cannot remove default flag from this tax config. Set another config as default first.")

        # Merge incoming values with the current saved values before checking rates.
        # Partial updates skip the schema-level validation, so we re-validate
        # the full final state here to catch any invalid rate combinations.
        new_total = float(data.get("total_rate", config.total_rate))
        new_cgst = float(data.get("cgst_rate", config.cgst_rate))
        new_sgst = float(data.get("sgst_rate", config.sgst_rate))
        new_igst = float(data.get("igst_rate", config.igst_rate))
        new_igst_mode = data.get("is_igst_mode", config.is_igst_mode)

        if new_igst_mode:
            if round(new_igst, 4) != round(new_total, 4):
                return CustomResponse(C.BAD_REQUEST, "igst_rate must equal total_rate when is_igst_mode is True")
        else:
            if round(new_cgst + new_sgst, 4) != round(new_total, 4):
                return CustomResponse(C.BAD_REQUEST, "cgst_rate + sgst_rate must equal total_rate")

        if any(r < 0 for r in [new_total, new_cgst, new_sgst, new_igst]):
            return CustomResponse(C.BAD_REQUEST, "Tax rates cannot be negative")

        if data.get("is_default") and not config.is_default:
            self.repo.unset_all_defaults()

        for field in ["name", "total_rate", "cgst_rate", "sgst_rate", "igst_rate",
                      "is_igst_mode", "is_inclusive", "is_default", "is_active"]:
            if field in data:
                setattr(config, field, data[field])

        config = self.repo.update(config)
        return CustomResponse(C.OK, "Tax config updated successfully", data=config)

    def delete(self, tax_config_id: int) -> CustomResponse:
        config = self._get_config(tax_config_id)
        if not config:
            return CustomResponse(C.NOT_FOUND, "Tax config not found")

        if config.is_default:
            return CustomResponse(C.BAD_REQUEST, "Cannot delete the default tax config. Assign another default first.")

        # Only block deletion when active categories are linked.
        # Inactive categories fall back to the system default at bill time,
        # so a deactivated category holding a reference to this config is not a risk.
        active_categories = [c for c in config.categories if c.is_active]
        if active_categories:
            return CustomResponse(C.BAD_REQUEST, "Cannot delete tax config assigned to active categories. Reassign those categories first.")

        self.repo.delete(config)
        return CustomResponse(C.OK, "Tax config deleted successfully")
