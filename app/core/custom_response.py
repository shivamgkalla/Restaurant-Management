import datetime
import uuid
from typing import Any, Optional
from fastapi.responses import JSONResponse
from app.core.http_constants import HttpConstants

_STATUS_MESSAGES = {
    200: HttpConstants.HttpStatusMessages.OK,
    201: HttpConstants.HttpStatusMessages.OK,
    204: HttpConstants.HttpStatusMessages.NO_CONTENT,
    400: HttpConstants.HttpStatusMessages.BAD_REQUEST,
    401: HttpConstants.HttpStatusMessages.UNAUTHORIZED,
    403: HttpConstants.HttpStatusMessages.FORBIDDEN,
    404: HttpConstants.HttpStatusMessages.NOT_FOUND,
    409: HttpConstants.HttpStatusMessages.CONFLICT,
    500: HttpConstants.HttpStatusMessages.INTERNAL_SERVER_ERROR,
}


class CustomResponse:

    # CustomResponse(statusCode)
    # CustomResponse(statusCode, message)
    # CustomResponse(statusCode, message, data)
    def __init__(
        self,
        status_code: int,
        message: Optional[str] = None,
        data: Any = None,
        meta: Optional[dict] = None,
    ):
        self.status_code = status_code
        self.success     = 200 <= status_code < 300
        self.message     = message or _STATUS_MESSAGES.get(status_code, HttpConstants.HttpStatusMessages.UNKNOWN)
        self.data        = data
        self.meta        = meta

    def to_json(self) -> JSONResponse:
        body = {
            "success":    self.success,
            "statusCode": self.status_code,
            "message":    self.message,
        }

        if self.data is not None:
            body["data"] = _jsonable(self.data)

        if self.meta is not None:
            body["meta"] = _jsonable(self.meta)

        return JSONResponse(status_code=self.status_code, content=body)


def _jsonable(obj: Any) -> Any:
    if obj is None or isinstance(obj, (bool, int, float, str)):
        return obj
    if isinstance(obj, (datetime.datetime, datetime.date)):
        return obj.isoformat()
    if isinstance(obj, uuid.UUID):
        return str(obj)
    if isinstance(obj, dict):
        return {k: _jsonable(v) for k, v in obj.items()}
    if isinstance(obj, (list, tuple)):
        return [_jsonable(i) for i in obj]
    if hasattr(obj, "model_dump"):       # Pydantic v2
        return _jsonable(obj.model_dump())
    if hasattr(obj, "dict"):             # Pydantic v1
        return _jsonable(obj.dict())
    if hasattr(obj, "__dict__"):         # SQLAlchemy model
        return _jsonable({k: v for k, v in obj.__dict__.items() if not k.startswith("_")})
    return obj