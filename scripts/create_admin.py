import os
import sys

# Add root to sys.path
sys.path.append(os.path.abspath(os.path.join(os.getcwd())))

from backend.app.db.session import SessionLocal
from backend.app.models.db_models import User
from backend.app.utils.auth import get_password_hash

def create_admin():
    db = SessionLocal()
    
    # Check if admin already exists
    admin = db.query(User).filter(User.username == "admin").first()
    if not admin:
        new_user = User(
            username="admin",
            password_hash=get_password_hash("admin123")
        )
        db.add(new_user)
        db.commit()
        print("Admin user 'admin' with password 'admin123' created successfully.")
    else:
        print("Admin user already exists.")
    
    db.close()

if __name__ == "__main__":
    create_admin()
