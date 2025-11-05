import requests
from bs4 import BeautifulSoup
import re

def scrape_wikipedia(url: str) -> tuple[str, str]:
    """
    Scrape the content of a Wikipedia article.
    
    Args:
        url (str): The URL of the Wikipedia article
        
    Returns:
        tuple[str, str]: A tuple containing (clean_text, title)
    """
    try:
        # Send GET request to the URL with headers to avoid 403 errors
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        # Parse the HTML content
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract the title
        title_element = soup.find('h1', {'class': 'firstHeading'})
        title = title_element.get_text() if title_element else "Unknown Title"
        
        # Extract the main content
        content_div = soup.find('div', {'id': 'mw-content-text'})
        if not content_div:
            raise Exception("Could not find main content div")
        
        # Remove unwanted elements
        for element in content_div(["script", "style", "sup", "table"]):
            element.decompose()
        
        # Extract paragraphs
        paragraphs = content_div.find_all('p')
        clean_text = ""
        
        for p in paragraphs:
            # Remove citation brackets
            text = re.sub(r'\[.*?\]', '', p.get_text())
            clean_text += text + "\n\n"
        
        # Clean up extra whitespace
        clean_text = re.sub(r'\n\s*\n', '\n\n', clean_text).strip()
        
        return clean_text, title
    
    except Exception as e:
        raise Exception(f"Error scraping Wikipedia: {str(e)}")