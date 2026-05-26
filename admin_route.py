from flask import Blueprint, render_template, request, redirect, url_for, flash
import sqlite3
import os
import re

admin_bp = Blueprint('admin', __name__, template_folder='templates')
DB_PATH = os.path.join(os.path.dirname(__file__), 'health_empire.db')

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    return conn

def generate_slug(title):
    """টাইটেল থেকে সুন্দর URL বা slug তৈরি করার ফাংশন"""
    slug = title.lower().strip()
    slug = re.sub(re.compile(r'[^\w\s-]'), '', slug)
    slug = re.sub(re.compile(r'[-\s]+'), '-', slug)
    return slug

@admin_bp.route('/add-post', methods=('GET', 'POST'))
def add_post():
    if request.method == 'POST':
        title = request.form['title']
        category = request.form['category']
        content = request.form['content']
        slug = generate_slug(title)

        if not title or not content:
            return "Title and Content are required!"
        else:
            conn = get_db_connection()
            try:
                conn.execute('INSERT INTO posts (title, slug, content, category) VALUES (?, ?, ?, ?)',
                             (title, slug, content, category))
                conn.commit()
                conn.close()
                return redirect('/blog')
            except sqlite3.IntegrityError:
                conn.close()
                return "Error: এই টাইটেলের পোস্ট অলরেডি ডেটাবেজে আছে! টাইটেল একটু পরিবর্তন করো।"

    return render_template('add_post.html')
