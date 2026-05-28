import schedule
import time

from blog_ai import generate_blog, save_blog

def daily_job():

    keyword = "simple home workout tips"

    article = generate_blog(keyword)

    save_blog(keyword, article)

    print("Blog created")

schedule.every().day.at("10:00").do(daily_job)

while True:

    schedule.run_pending()

    time.sleep(30)
