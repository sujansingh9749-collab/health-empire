from flask import Flask, render_template, request, jsonify
import sqlite3
import os

app = Flask(__name__)

DB_PATH = os.path.join(os.getcwd(), 'health_empire.db')

@app.route("/")
def home():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute("SELECT title, slug, category FROM posts ORDER BY id DESC")
    posts = c.fetchall()
    conn.close()
    return render_template("tool.html", posts=posts)

# নতুন ডেডিকেটেড /blog রুট (যা তোমার ৪-০-৪ এরর ফিক্স করবে)
@app.route("/blog")
def blog_index():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute("SELECT title, slug, category FROM posts ORDER BY id DESC")
    posts = c.fetchall()
    conn.close()
    return render_template("blog.html", posts=posts)

@app.route("/blog/<slug>")
def blog_post(slug):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute("SELECT * FROM posts WHERE slug=?", (slug,))
    post = c.fetchone()
    conn.close()
    if not post:
        return "<h1>Article Not Found</h1><a href="/">Go Back</a>", 404
    return render_template("post.html", post=post)

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/privacy-policy")
def privacy():
    return render_template("privacy.html")

@app.route("/disclaimer")
def disclaimer():
    return render_template("disclaimer.html")

@app.route("/terms")
def terms():
    return render_template("terms.html")

@app.route("/contact")
def contact():
    try:
        return render_template("contact.html")
    except:
        return "<h1>Contact Us</h1><p>Email: support@purelifehealthai.com</p><a href="/">Back Home</a>"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))