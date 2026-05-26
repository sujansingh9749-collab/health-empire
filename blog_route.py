from flask import Blueprint, render_template, abort
import sqlite3
import os

blog_bp = Blueprint('blog', __name__, template_folder='templates')
DB_PATH = os.path.join(os.path.dirname(__file__), 'health_empire.db')

def get_db_connection():
    """ডেটাবেজ কানেকশন তৈরি করার ফাংশন"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@blog_bp.route('/blog')
def blog_index():
    """সব ব্লগের লিস্ট দেখানোর মেইন পেজ"""
    conn = get_db_connection()
    posts = conn.execute('SELECT * FROM posts ORDER BY date_created DESC').fetchall()
    conn.close()
    return render_template('blog.html', posts=posts)

@blog_bp.route('/blog/<string:slug>')
def blog_post(slug):
    """আলাদা আলাদা সিঙ্গেল ব্লগ পোস্ট দেখানোর পেজ"""
    conn = get_db_connection()
    post = conn.execute('SELECT * FROM posts WHERE slug = ?', (slug,)).fetchone()
    conn.close()

    if post is None:
        abort(404)

    # এখানে আমরা নতুন এবং সঠিক টেমপ্লেট 'post.html' রেন্ডার করছি
    return render_template('post.html', post=post)

@blog_bp.route('/sitemap.xml')
def dynamic_sitemap():
    """ডেটাবেজ থেকে লাইভ পোস্ট নিয়ে ডাইনামিক সাইটম্যাপ তৈরি করবে"""
    from flask import Response
    import datetime
    
    conn = get_db_connection()
    posts = conn.execute('SELECT slug, date_created FROM posts ORDER BY date_created DESC').fetchall()
    conn.close()
    
    # বর্তমান বছর জেনারেট করার জন্য
    current_year = datetime.datetime.now().strftime('%Y')
    
    sitemap_xml = f'''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://yourdomain.com/</loc>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://yourdomain.com/blog</loc>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://yourdomain.com/privacy-policy</loc>
        <priority>0.5</priority>
    </url>
    <url>
        <loc>https://yourdomain.com/about</loc>
        <priority>0.5</priority>
    </url>
    <url>
        <loc>https://yourdomain.com/contact</loc>
        <priority>0.5</priority>
    </url>
    <url>
        <loc>https://yourdomain.com/terms</loc>
        <priority>0.5</priority>
    </url>'''
    
    for post in posts:
        sitemap_xml += f'''
    <url>
        <loc>https://yourdomain.com/blog/{post['slug']}</loc>
        <priority>0.7</priority>
    </url>'''
        
    sitemap_xml += '\n</urlset>'
    return Response(sitemap_xml, mimetype='application/xml')
