from fastapi import FastAPI
from app.database import engine, Base
from app.models import *  # noqa: F401, F403 — ensures all models are registered
from app.Routes import auth, staff, category, menu_item,customer
from app.Routes import table_zone, restaurant_table, table_merge, table_transfer
app = FastAPI(title="Restro Management API")

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(staff.router)
app.include_router(category.router)
app.include_router(menu_item.router)
app.include_router(table_zone.router)
app.include_router(restaurant_table.router)
app.include_router(table_merge.router)
app.include_router(table_transfer.router)
app.include_router(customer.router)

@app.get("/")
def root():
    return {"message": "Restro Management API is running!"}
