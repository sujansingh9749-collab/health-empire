import os
import requests
import json

API_KEY = os.getenv("GEMINI_API_KEY")

url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={API_KEY}"

data = {
    "contents": [
        {
            "parts": [
                {
                    "text": "Write a natural and informative 100-word introduction about healthy lifestyle habits."
                }
            ]
        }
    ]
}

response = requests.post(
    url,
    headers={
        "Content-Type": "application/json"
    },
    data=json.dumps(data)
)

result = response.json()

print(result)
