from dataclasses import dataclass

from fastapi import Query


@dataclass
class PaginationParams:
    page:  int
    limit: int

    @property
    def offset(self) -> int:
        return (self.page - 1) * self.limit


def pagination_params(
    page:  int = Query(default=1,  ge=1,         description="Page number (1-based)"),
    limit: int = Query(default=10, ge=1, le=100, description="Items per page (max 100)"),
) -> PaginationParams:
    return PaginationParams(page=page, limit=limit)
