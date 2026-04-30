import logging
from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError

from app.core.http_constants import HttpConstants

logger = logging.getLogger(__name__)

C = HttpConstants.HttpResponseCodes
M = HttpConstants.HttpStatusMessages


# ── helper — same structure as CustomResponse ────────────────────────────────
def _make_error(status_code: int, message: str) -> JSONResponse:
    return JSONResponse(
        status_code=status_code,
        content={
            "success":    False,
            "statusCode": status_code,
            "message":    message,
        },
    )


# ── 1. HTTPException (404, 401, 403 etc raised anywhere) ────────────────────
async def http_exception_handler(request: Request, exc: HTTPException) -> JSONResponse:
    logger.warning("HTTPException %s — %s", exc.status_code, exc.detail)
    return _make_error(exc.status_code, str(exc.detail))


# ── 2. Validation error (wrong request body / query params) ─────────────────
async def validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    # Build a readable message from pydantic errors
    errors = exc.errors()
    if errors:
        first = errors[0]
        field   = " → ".join(str(loc) for loc in first.get("loc", []))
        problem = first.get("msg", "Invalid input")
        message = f"{field}: {problem}" if field else problem
    else:
        message = M.BAD_REQUEST

    logger.warning("ValidationError on %s — %s", request.url.path, errors)
    return _make_error(C.BAD_REQUEST, message)


# ── 3. Catch-all — any unhandled Python exception (the 500 you just saw) ────
async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.exception("Unhandled exception on %s", request.url.path)
    return _make_error(
        C.INTERNAL_SERVER_ERROR,
        HttpConstants.HttpResponse.UNHANDLED_EXCEPTION,
    )
