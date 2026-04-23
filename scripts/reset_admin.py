import os
import sys

# Add root and backend to sys.path
sys.path.append(os.path.abspath(os.path.join(os.getcwd())))
sys.path.append(os.path.abspath(os.path.join(os.getcwd(), "backend")))

from app.db.session import SessionLocal
from app.models.db_models import User
from app.utils.auth import get_password_hash

def reset_admin():
    db = SessionLocal()
    
    # Find admin
    admin = db.query(User).filter(User.username == "admin").first()
    if admin:
        admin.password_hash = get_password_hash("admin123")
        db.commit()
        print("Admin password reset to 'admin123'.")
    else:
        new_user = User(
            username="admin",
            password_hash=get_password_hash("admin123")
        )
        db.add(new_user)
        db.commit()
        print("Admin user created with password 'admin123'.")
    
    db.close()

if __name__ == "__main__":
    reset_admin()
