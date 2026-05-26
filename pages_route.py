from flask import Blueprint, render_template

pages_bp = Blueprint('pages', __name__, template_folder='templates')

@pages_bp.route('/privacy-policy')
def privacy():
    return render_template('privacy.html')

@pages_bp.route('/about')
def about():
    return render_template('about.html')

@pages_bp.route('/disclaimer')
def disclaimer():
    return render_template('disclaimer.html')

@pages_bp.route('/terms')
def terms():
    return render_template('terms.html')

@pages_bp.route('/contact')
def contact():
    return render_template('contact.html')
