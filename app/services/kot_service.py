from fastapi import HTTPException
from typing import Optional
from sqlalchemy.orm import Session
from app.repositories.kot_repo import KOTRepository
from app.core.custom_response import CustomResponse
from app.core.http_constants import HttpConstants
from app.utils.pagination.params import PaginationParams

C = HttpConstants.HttpResponseCodes

class KOTService:
    def __init__(self, db: Session):
        self.repo = KOTRepository(db)

    def get_by_order(self, order_id: int):
        return self.repo.get_by_order(order_id)

    def get_by_id(self, kot_id: int):
        kot = self.repo.get_by_id(kot_id)
        if not kot:
            raise HTTPException(status_code=404, detail="KOT not found")
        return kot

    def mark_printed(self, kot_id: int):
        kot = self.get_by_id(kot_id)
        kot.is_printed = True
        return self.repo.update(kot)

    def mark_urgent(self, kot_id: int):
        kot = self.get_by_id(kot_id)
        kot.is_urgent = True
        return self.repo.update(kot)

    # ── Toggle is_prepared on an order item ───────────────────────────────────

    def toggle_prepared(self, order_item_id: int) -> CustomResponse:
        item = self.repo.get_order_item_by_id(order_item_id)
        if not item:
            return CustomResponse(C.NOT_FOUND, "Order item not found")
        item.is_prepared = not item.is_prepared
        self.repo.update_order_item(item)
        status = "prepared" if item.is_prepared else "unprepared"
        return CustomResponse(C.OK, f"Item marked as {status} successfully", data={
            "order_item_id": item.id,
            "is_prepared":   item.is_prepared,
        })

    # ── KOT Details: paginated, grouped by station + category ─────────────────

    def get_kot_details(
        self,
        params: PaginationParams,
        search: Optional[str] = None,
        category_id: Optional[int] = None,
    ) -> CustomResponse:
        result = self.repo.get_kot_details(params, search=search, category_id=category_id)

        data = [
            self._build_kot_detail(order, category_id=category_id)
            for order in result.items
        ]

        return CustomResponse(C.OK, "KOT details fetched successfully", data=data, meta=result.meta)

    def _build_kot_detail(self, order, category_id: Optional[int] = None) -> dict:
        """
        Builds KOT detail for one order:
        - table_id, table_name from order.table
        - stations: items grouped by kitchen station
        - categories: items grouped by category with total_count
          (total_count = sum of quantity where is_prepared=False)
        """
        station_map: dict[int, dict] = {}
        category_map: dict[int, dict] = {}

        for item in order.items:
            # skip cancelled items
            if item.is_cancelled:
                continue

            mi = item.menu_item
            if not mi:
                continue

            # apply category filter
            if category_id is not None and mi.category_id != category_id:
                continue

            # ── Station grouping ──────────────────────────────────────────────
            if mi.station:
                sid = mi.station.id
                if sid not in station_map:
                    station_map[sid] = {
                        "station_id":   sid,
                        "station_name": mi.station.name,
                        "items":        [],
                    }
                station_map[sid]["items"].append({
                    "order_item_id":        item.id,
                    "menu_item_id":         mi.id,
                    "menu_item_name":       mi.name,
                    "category_id":          mi.category_id,
                    "category_name":        mi.category.name if mi.category else None,
                    "quantity":             item.quantity,
                    "unit_price":           item.unit_price,
                    "is_prepared":          item.is_prepared,
                    "special_instructions": item.special_instructions,
                })

            # ── Category grouping ─────────────────────────────────────────────
            if mi.category:
                cid = mi.category.id
                if cid not in category_map:
                    category_map[cid] = {
                        "category_id":   cid,
                        "category_name": mi.category.name,
                        "total_count":   0,   # only unprepared quantities
                        "items":         [],
                    }

                category_map[cid]["items"].append({
                    "order_item_id":        item.id,
                    "menu_item_id":         mi.id,
                    "menu_item_name":       mi.name,
                    "count":                item.quantity,
                    "is_prepared":          item.is_prepared,
                    "special_instructions": item.special_instructions,
                })

                # total_count = sum of quantity for unprepared items only
                if not item.is_prepared:
                    category_map[cid]["total_count"] += item.quantity

        return {
            "order_id":     order.id,
            "order_number": order.order_number,
            "table_id":     order.table.id if order.table else None,
            "table_name":   order.table.table_number if order.table else None,
            "stations":     list(station_map.values()),
            "categories":   list(category_map.values()),
        }