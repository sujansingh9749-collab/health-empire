import requests

API_KEY = "AIzaSyAHCx7hSMSHamekQ1AHXmFZFchhONmTioA"

def ask_ai(prompt):

    try:

        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"

        data = {
            "contents": [
                {
                    "parts": [
                        {"text": prompt}
                    ]
                }
            ]
        }

        response = requests.post(url, json=data)

        result = response.json()

        if "candidates" in result:

            return result["candidates"][0]["content"]["parts"][0]["text"]

        else:

            return str(result)

    except Exception as e:

        return str(e)
