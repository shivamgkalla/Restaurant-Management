from sqlalchemy.orm import Query as SAQuery

from app.utils.pagination.params import PaginationParams
from app.utils.pagination.result import PagedResult


def paginate(query: SAQuery, params: PaginationParams) -> PagedResult:
    total = query.count()
    items = query.offset(params.offset).limit(params.limit).all()

    return PagedResult(
        items = items,
        total = total,
        page  = params.page,
        limit = params.limit,
    )
