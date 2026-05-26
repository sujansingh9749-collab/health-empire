from flask import Flask, render_template, redirect
from blog_route import blog_bp
from admin_route import admin_bp
from pages_route import pages_bp
import os

app = Flask(__name__)
app.secret_key = "super-secret-key-for-health-empire"

# সব ব্লু-প্রিন্ট বা রুটগুলো রেজিস্টার করা হচ্ছে
app.register_blueprint(blog_bp)
app.register_blueprint(admin_bp)
app.register_blueprint(pages_bp)

@app.route('/')
def home():
    """মেইন লিঙ্কে ঢুকলে সরাসরি ওই প্রিমিয়াম BMI ক্যালকুলেটর পেজটি ওপেন হবে"""
    return render_template('tool.html')

@app.route('/sitemap.xml')
def sitemap_redirect():
    """গুগল ক্রলার মেইন ডোমেইনে সাইটম্যাপ খুঁজলে তাকে সঠিক রুটে নিয়ে যাবে"""
    return redirect('/blog/sitemap.xml')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
