import sys
sys.path.append('backend')
from backend.scraper import scrape_wikipedia

try:
    content, title = scrape_wikipedia("https://en.wikipedia.org/wiki/Test")
    print(f"Title: {title}")
    print(f"Content length: {len(content)}")
    print("Scraping successful!")
except Exception as e:
    print(f"Error: {e}")