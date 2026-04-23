import uuid
from sqlalchemy import Column, String, Float, Integer, DateTime, ForeignKey, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app.db.session import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Sender(Base):
    __tablename__ = "senders"
    
    sender_id = Column(String, primary_key=True, index=True)
    total_messages = Column(Integer, default=0)
    spam_count = Column(Integer, default=0)
    score = Column(Float, default=0.0)
    status = Column(String, default="Unknown")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Message(Base):
    __tablename__ = "messages"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sender_id = Column(String, ForeignKey("senders.sender_id"), nullable=False)
    message_text = Column(String, nullable=False)
    is_spam = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
