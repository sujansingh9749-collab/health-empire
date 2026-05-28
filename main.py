from flask import Flask, render_template, request, send_from_directory
import os

from bmi import bmi
from calories import calories
from ai import ask_ai

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def home():

    result = None

    if request.method == "POST":

        weight = float(request.form["weight"])

        height = float(request.form["height"])

        age = int(request.form["age"])

        b = bmi(weight, height)

        c = calories(weight, height, age)

        prompt = f"""
        BMI: {b}
        Calories: {c}

        Give general Indian/Bengali wellness advice only.

        Rules:
        - no medical diagnosis
        - no dangerous advice
        - simple language
        """

        ai_text = ask_ai(prompt)

        result = {
            "bmi": b,
            "calories": c,
            "ai": ai_text
        }

    return render_template("tool.html", result=result)


@app.route("/blog")
def blog_list():

    posts = []

    if os.path.exists("posts"):

        for file in os.listdir("posts"):

            if file.endswith(".html"):

                posts.append(file)

    html = """
    <html>

    <head>

    <title>AI Health Blogs</title>

    </head>

    <body>

    <h1>AI Health Blogs</h1>

    <hr>

    """

    for post in posts:

        name = post.replace(".html", "").replace("_", " ").title()

        html += f"""

        <p>

        <a href="/blog/{post}">

        {name}

        </a>

        </p>

        """

    html += """

    </body>

    </html>
    """

    return html


@app.route("/blog/<filename>")
def blog_post(filename):

    return send_from_directory("posts", filename)


app.run(host="0.0.0.0", port=5000)
