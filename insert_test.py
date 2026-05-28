import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'health_empire.db')

def insert_sample_post():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # টেস্ট করার জন্য একটি স্যাম্পল ডেটা
    title = "5 Simple Habits for a Healthier Life"
    slug = "simple-habits-for-healthier-life"
    category = "Lifestyle"
    content = """
    <h2>Small Changes, Big Results</h2>
    <p>Living a healthy life doesn't mean changing everything overnight. You can start with small habits.</p>
    <h3>1. Drink More Water</h3>
    <p>Staying hydrated keeps your energy levels up and helps your skin look great.</p>
    <h3>2. Walk 10 Minutes Daily</h3>
    <p>A short walk after meals can drastically improve your digestion and heart health.</p>
    """
    
    try:
        cursor.execute('''
            INSERT INTO posts (title, slug, content, category)
            VALUES (?, ?, ?, ?)
        ''', (title, slug, content, category))
        conn.commit()
        print("Sample blog post inserted successfully into database!")
    except sqlite3.IntegrityError:
        print("Post with this slug already exists.")
        
    conn.close()

if __name__ == "__main__":
    insert_sample_post()
