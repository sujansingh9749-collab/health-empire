import os

path = 'templates/blog.html'
if os.path.exists(path):
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    if 'name="description"' not in html:
        seo_meta = '''
    <title>Health Blog | Fitness, Diet & Wellness Tips</title>
    <meta name="description" content="Read the latest health, fitness, and diet articles on PureLife Health AI. Discover proven lifestyle and wellness guides.">
    <meta name="keywords" content="health blog, fitness tips, diet plans, wellness articles, live healthy">
    <meta name="robots" content="index, follow">
'''
        # <head> ট্যাগের ঠিক নিচে মেটা ট্যাগ বসিয়ে দেওয়া হচ্ছে
        html = html.replace('<head>', '<head>' + seo_meta)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
        print('✅ blog.html এসইও মেটা ট্যাগ দিয়ে আপগ্রেড হয়েছে!')
    else:
        print('ℹ️ blog.html এ মেটা ট্যাগ অলরেডি আছে ভাই!')
else:
    print('❌ templates/blog.html ফাইলটি খুঁজে পাওয়া যায়নি!')
