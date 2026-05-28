import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'health_empire.db')

def init_db():
    """ডেটাবেজ এবং ব্লগ পোস্ট টেবিল তৈরি করার ফাংশন"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # ব্লগ পোস্টের জন্য টেবিল তৈরি (যদি না থাকে)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            content TEXT NOT NULL,
            category TEXT NOT NULL,
            date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()
    print("Database initialized successfully!")

if __name__ == "__main__":
    init_db()
