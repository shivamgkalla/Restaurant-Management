from fastapi import FastAPI
from app.Routes import auth, staff, category, menu_item, customer
from app.Routes import table_zone, restaurant_table, table_merge, table_transfer
from app.Routes import kitchen_station, order, order_item, kot

app = FastAPI(title="Restro Management API")

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

@app.get("/")
def root():
    return {"message": "Restro Management API is running!"}