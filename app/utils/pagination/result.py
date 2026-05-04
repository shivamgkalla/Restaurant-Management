import math
from typing import Generic, List, TypeVar

T = TypeVar("T")


class PagedResult(Generic[T]):

    def __init__(self, *, items: List[T], total: int, page: int, limit: int):
        self.items = items
        self.total = total
        self.page  = page
        self.limit = limit

    @property
    def total_pages(self) -> int:
        return math.ceil(self.total / self.limit) if self.limit > 0 else 1

    @property
    def has_next_page(self) -> bool:
        return self.page < self.total_pages

    @property
    def has_previous_page(self) -> bool:
        return self.page > 1

    @property
    def meta(self) -> dict:
        return {
            "total":             self.total,
            "page":              self.page,
            "limit":             self.limit,
            "total_pages":       self.total_pages,
            "has_next_page":     self.has_next_page,
            "has_previous_page": self.has_previous_page,
        }
