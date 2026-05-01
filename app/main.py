from fastapi import FastAPI,HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from app.Routes import auth, staff, category, menu_item, customer
from app.Routes import table_zone, restaurant_table, table_merge, table_transfer
from app.Routes import kitchen_station, order, order_item, kot
from app.Routes import tax_config, bill, discount_config, payment
from app.core.exception_handlers import (
    http_exception_handler,
    validation_exception_handler,
    unhandled_exception_handler,
)

app = FastAPI(title="Restro Management API")

# ── Global exception handlers ────────────────────────────────────────────────
app.add_exception_handler(HTTPException,           http_exception_handler)
app.add_exception_handler(RequestValidationError,  validation_exception_handler)
app.add_exception_handler(Exception,               unhandled_exception_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth.router)
app.include_router(staff.router)
app.include_router(category.router)
app.include_router(menu_item.router)
app.include_router(table_zone.router)
app.include_router(restaurant_table.router)
app.include_router(table_merge.router)
app.include_router(table_transfer.router)
app.include_router(customer.router)
app.include_router(kitchen_station.router)
app.include_router(order.router)
app.include_router(order_item.router)
app.include_router(kot.router)
app.include_router(tax_config.router)
app.include_router(discount_config.router)
app.include_router(bill.router)
app.include_router(payment.router)

@app.get("/")
def root():
    return {"message": "Restro Management API is running!"}