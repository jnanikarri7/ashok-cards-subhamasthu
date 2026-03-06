from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime

# --- PRODUCT MODEL (The Wedding Cards) ---
class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    description: str
    price: float
    image_url: Optional[str] = None
    stock: int = Field(default=100)
    category: str = Field(default="Traditional")
    
    # Relationship: A product can be in many orders (through OrderItem, simplified here for MVP)
    orders: List["Order"] = Relationship(back_populates="product")

# --- ORDER MODEL (The Purchase & Razorpay Info) ---
class Order(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    status: str = Field(default="pending") # pending, paid, processing, shipped
    total_amount: float
    razorpay_order_id: Optional[str] = Field(default=None, index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    product_id: Optional[int] = Field(default=None, foreign_key="product.id")
    product: Optional[Product] = Relationship(back_populates="orders")
    
    wedding_details: Optional["WeddingDetails"] = Relationship(back_populates="order")

# --- WEDDING DETAILS MODEL (The Customization Form) ---
class WeddingDetails(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    bride_name: str
    groom_name: str
    wedding_date: datetime
    venue_address: str
    contact_number: str # For the WhatsApp integration
    extra_notes: Optional[str] = None
    
    # Relationship: Tied to a specific order
    order_id: int = Field(foreign_key="order.id")
    order: Optional[Order] = Relationship(back_populates="wedding_details")

# --- USER/ADMIN MODEL (For the /admin dashboard) ---
class AdminUser(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
    is_active: bool = Field(default=True)