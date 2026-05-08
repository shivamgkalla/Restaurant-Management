from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app.core.dependencies import require_admin, require_billing_staff
from app.models.rfid_card import RFIDCardStatusEnum
from app.schemas.rfid_card import (
    RegisterCardRequest,
    BindCardRequest,
    LoadCardRequest,
    ClearCardRequest,
)
from app.services.rfid_card_service import RFIDCardService

router = APIRouter(prefix="/rfid-cards", tags=["RFID Cards"])


@router.get(
    "",
    summary="List all RFID cards",
    description="Returns a paginated list of all registered RFID cards. Optionally filter by card status (available / active / blocked / lost). Admin only.",
)
def list_cards(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    status_filter: Optional[RFIDCardStatusEnum] = Query(None, alias="status", description="Filter by card status"),
    db: Session = Depends(get_db),
    current_staff=Depends(require_admin),
):
    return RFIDCardService(db).list_cards(skip=skip, limit=limit, status_filter=status_filter).to_json()


@router.get(
    "/all",
    summary="Get all RFID cards",
    description="Returns all RFID cards without pagination. Admin only.",
)
def get_all_cards(
    db: Session = Depends(get_db),
    current_staff=Depends(require_admin),
):
    return RFIDCardService(db).get_all_cards().to_json()


@router.post(
    "",
    summary="Register a new RFID card",
    description="Register a physical RFID card into the system. The card starts with zero balance and available status. Admin only.",
)
def register_card(
    data: RegisterCardRequest,
    db: Session = Depends(get_db),
    current_staff=Depends(require_admin),
):
    return RFIDCardService(db).register_card(data, current_staff).to_json()


# NOTE: /uid/{card_uid} must be declared before /{card_id} so FastAPI does not
# try to parse the literal string "uid" as an integer for the card_id path parameter.
@router.get(
    "/uid/{card_uid}",
    summary="Get card by UID",
    description="Look up a card by its physical RFID chip UID. Used at the counter when a customer scans their card.",
)
def get_card_by_uid(
    card_uid: str,
    db: Session = Depends(get_db),
    current_staff=Depends(require_billing_staff),
):
    return RFIDCardService(db).get_card_by_uid(card_uid).to_json()


@router.get(
    "/{card_id}",
    summary="Get card by ID",
    description="Fetch a single RFID card by its database ID. Returns current balance, status, and bound customer.",
)
def get_card(
    card_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(require_billing_staff),
):
    return RFIDCardService(db).get_card(card_id).to_json()


@router.post(
    "/{card_id}/bind",
    summary="Bind card to customer",
    description="Bind an available card to a customer and load the initial balance. The customer pays at the counter with cash or online; this records the equivalent virtual credit on the card.",
)
def bind_card(
    card_id: int,
    data: BindCardRequest,
    db: Session = Depends(get_db),
    current_staff=Depends(require_billing_staff),
):
    return RFIDCardService(db).bind_card(card_id, data, current_staff).to_json()


@router.post(
    "/{card_id}/load",
    summary="Load / reload card balance",
    description="Top up an active card. The customer pays real money at the counter and the virtual balance increases by the same amount.",
)
def load_card(
    card_id: int,
    data: LoadCardRequest,
    db: Session = Depends(get_db),
    current_staff=Depends(require_billing_staff),
):
    return RFIDCardService(db).load_card(card_id, data, current_staff).to_json()


@router.post(
    "/{card_id}/clear",
    summary="Clear and unbind card",
    description="Clear a card after the customer's session ends. Refunds any remaining balance to the customer (record the refund method) and returns the card to the available pool for the next customer.",
)
def clear_card(
    card_id: int,
    data: ClearCardRequest,
    db: Session = Depends(get_db),
    current_staff=Depends(require_billing_staff),
):
    return RFIDCardService(db).clear_card(card_id, data, current_staff).to_json()


@router.patch(
    "/{card_id}/block",
    summary="Block a card",
    description="Block a card immediately. Blocked cards cannot accept loads or be used for payment. Used for damaged or suspicious cards. Admin only.",
)
def block_card(
    card_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(require_admin),
):
    return RFIDCardService(db).block_card(card_id, current_staff).to_json()


@router.patch(
    "/{card_id}/lost",
    summary="Mark card as lost",
    description="Mark a card as lost. Operationally same as blocked (no loads or payments allowed), but kept as a separate status so lost cards appear distinctly in inventory reports. Admin only.",
)
def mark_card_lost(
    card_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(require_admin),
):
    return RFIDCardService(db).mark_lost(card_id, current_staff).to_json()


@router.patch(
    "/{card_id}/unblock",
    summary="Unblock a card",
    description="Restore a previously blocked or lost card. If the card still has a customer linked it returns to active status; otherwise it returns to available. Admin only.",
)
def unblock_card(
    card_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(require_admin),
):
    return RFIDCardService(db).unblock_card(card_id, current_staff).to_json()


@router.get(
    "/{card_id}/transactions",
    summary="Card transaction history",
    description="Returns the full transaction history for a card — all loads, bill payment debits, and refunds — in reverse chronological order.",
)
def get_card_transactions(
    card_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
    current_staff=Depends(require_billing_staff),
):
    return RFIDCardService(db).get_transactions(card_id, skip=skip, limit=limit).to_json()
