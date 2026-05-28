import os
import requests
import json
from datetime import datetime

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    print("🚨 GEMINI_API_KEY not found. Please check your environment or .env file.")
    exit(1)

topics = [
    "Healthy breakfast ideas", "Simple home workout tips", "Understanding BMI and body health",
    "Daily healthy habits", "Sleep improvement tips", "Benefits of drinking water",
    "Healthy weight loss tips", "Best foods for heart health", "Morning routine for better health",
    "Benefits of walking every day", "How to improve digestion naturally", "Healthy eating on a budget",
    "Simple stretching exercises", "Benefits of regular exercise", "Signs of dehydration",
    "Healthy snacks for busy people", "Foods that boost energy", "Tips for reducing stress naturally",
    "Importance of sleep for health", "Best foods for stronger immunity", "Simple yoga poses for beginners",
    "How to stay active at work", "Healthy habits for students", "Benefits of meditation",
    "Tips for healthy skin naturally", "Importance of mental wellness", "Foods rich in protein",
    "Benefits of eating fruits daily", "Simple healthy dinner ideas", "How to maintain healthy weight",
    "Daily habits for better focus", "Healthy lifestyle for office workers", "Benefits of home workouts",
    "Simple cardio exercises", "How to improve posture", "Healthy habits for teenagers",
    "Foods for healthy bones", "Healthy habits after age 30", "How to reduce screen time",
    "Benefits of cycling", "Foods that improve brain health", "Healthy habits for better sleep",
    "How to avoid unhealthy eating habits", "Importance of body hydration", "Benefits of eating vegetables",
    "Simple exercises without equipment", "Healthy meal planning tips", "Benefits of regular stretching",
    "Healthy habits for beginners", "How to stay motivated for fitness", "Healthy habits for busy schedules",
    "Benefits of maintaining good posture", "Simple habits for healthier life", "Foods that support weight management",
    "Tips for healthy lifestyle changes", "Healthy habits during summer", "Healthy habits during winter",
    "How to reduce sugar intake", "Benefits of healthy eating", "Tips for improving daily energy",
    "Simple healthy lunch ideas", "Healthy habits for families", "Benefits of outdoor activities",
    "How to build healthy routines", "Foods that support metabolism", "Simple wellness tips",
    "Healthy lifestyle myths", "Common fitness mistakes", "Daily self-care habits",
    "Simple habits for mental health", "Healthy habits for long-term wellness"
]

def save_blog(keyword, article):
    filename = keyword.lower().replace(" ", "_") + ".html"
    os.makedirs("posts", exist_ok=True)
    path = os.path.join("posts", filename)
    with open(path, "w", encoding="utf-8") as f:
        f.write(article.strip())
    print("🟢 Created:", filename)

def generate_blog(keyword):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={API_KEY}"
    prompt = f"Write a health blog article about: {keyword}\nRequirements: Return raw HTML content ONLY. Do NOT use markdown blocks. Include Introduction, 3-5 subheadings (<h2>), bullet points, one practical example, FAQ section, short takeaway."
    data = {"contents": [{"parts": [{"text": prompt}]}]}
    try:
        response = requests.post(url, headers={"Content-Type": "application/json"}, data=json.dumps(data))
        if response.status_code != 200:
            print(f"🚨 API Error ({response.status_code})")
            return None
        result = response.json()
        article = result["candidates"][0]["content"]["parts"][0]["text"].replace("```html", "").replace("```", "")
        save_blog(keyword, article)
        return article
    except Exception as e:
        print(f"🚨 Error: {str(e)}")
        return None

if __name__ == "__main__":
    topic = topics[datetime.now().day % len(topics)]
    generate_blog(topic)
