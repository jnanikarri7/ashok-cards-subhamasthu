import razorpay
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from database import get_session, settings
from models import Order, Product, WeddingDetails

router = APIRouter(
    prefix="/api/orders",
    tags=["Orders"]
)

# Initialize Razorpay Client
razorpay_client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

# Create a Pydantic schema for the incoming request data
class OrderCreateRequest(BaseModel):
    product_id: int
    bride_name: str
    groom_name: str
    wedding_date: datetime
    venue_address: str
    contact_number: str
    extra_notes: Optional[str] = None

@router.post("/create")
def create_order(request: OrderCreateRequest, session: Session = Depends(get_session)):
    # 1. Verify the product exists
    product = session.get(Product, request.product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # 2. Create Razorpay Order
    # Razorpay expects amount in paise (multiply INR by 100)
    amount_in_paise = int(product.price * 100) 
    razorpay_order = razorpay_client.order.create(dict(
        amount=amount_in_paise,
        currency="INR",
        payment_capture=1 # Auto-capture payment
    ))

    # 3. Save Order to Database
    new_order = Order(
        status="pending",
        total_amount=product.price,
        razorpay_order_id=razorpay_order["id"],
        product_id=product.id
    )
    session.add(new_order)
    session.commit()
    session.refresh(new_order)

    # 4. Save the Wedding Details tied to this order
    wedding_details = WeddingDetails(
        bride_name=request.bride_name,
        groom_name=request.groom_name,
        wedding_date=request.wedding_date,
        venue_address=request.venue_address,
        contact_number=request.contact_number,
        extra_notes=request.extra_notes,
        order_id=new_order.id
    )
    session.add(wedding_details)
    session.commit()

    # 5. Return the Razorpay order ID to the frontend so it can open the payment modal
    return {
        "order_id": new_order.id,
        "razorpay_order_id": razorpay_order["id"],
        "amount": product.price,
        "currency": "INR"
    }