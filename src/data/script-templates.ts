
export const scriptTemplates = [
  {
    id: 'blank',
    name: 'Blank Script',
    description: 'A blank script to start from scratch.',
    code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

# Initialize browser options
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run in headless mode
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

# Create a new Chrome browser instance
driver = webdriver.Chrome(options=chrome_options)

try:
    # Your Selenium code here
    print("Selenium WebDriver initialized successfully!")
    
finally:
    # Always close the browser at the end
    driver.quit()
`
  },
  {
    id: 'login-test',
    name: 'Login Form Test',
    description: 'Tests a basic login form with error handling.',
    code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Initialize browser options
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run in headless mode
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

# Create a new Chrome browser instance
driver = webdriver.Chrome(options=chrome_options)

try:
    # Navigate to the login page
    driver.get("https://example.com/login")
    
    # Wait for the login form to be visible
    WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.ID, "login-form"))
    )
    
    # Find the username and password fields
    username_field = driver.find_element(By.ID, "username")
    password_field = driver.find_element(By.ID, "password")
    
    # Enter the credentials
    username_field.send_keys("testuser")
    password_field.send_keys("password123")
    
    # Submit the form
    login_button = driver.find_element(By.ID, "login-button")
    login_button.click()
    
    # Wait for successful login (check for an element that appears after login)
    WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.CLASS_NAME, "dashboard"))
    )
    
    # Verify login was successful
    print("Login successful!")
    
except Exception as e:
    print(f"Login test failed: {str(e)}")
    
finally:
    # Always close the browser at the end
    driver.quit()
`
  },
  {
    id: 'data-scraper',
    name: 'Web Scraper',
    description: 'Scrapes data from a web page and formats the results.',
    code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import csv
import time

# Initialize browser options
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run in headless mode
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

# Create a new Chrome browser instance
driver = webdriver.Chrome(options=chrome_options)

try:
    # Navigate to the target website
    driver.get("https://example.com/products")
    
    # Wait for the product list to load
    WebDriverWait(driver, 10).until(
        EC.presence_of_all_elements_located((By.CLASS_NAME, "product-item"))
    )
    
    # Collect all product items
    products = driver.find_elements(By.CLASS_NAME, "product-item")
    
    # Prepare data structure for scraped data
    scraped_data = []
    
    # Extract information from each product
    for product in products:
        name = product.find_element(By.CLASS_NAME, "product-name").text
        price = product.find_element(By.CLASS_NAME, "product-price").text
        
        # Try to get description, but it might not exist for all products
        try:
            description = product.find_element(By.CLASS_NAME, "product-description").text
        except:
            description = "No description available"
        
        # Add the data to our collection
        scraped_data.append({
            "name": name,
            "price": price,
            "description": description
        })
    
    # Print results
    print(f"Scraped {len(scraped_data)} products:")
    for product in scraped_data[:5]:  # Show first 5 for demo
        print(f"- {product['name']} ({product['price']})")
    
    # Optional: Export to CSV
    # with open('products.csv', 'w', newline='') as csvfile:
    #     fieldnames = ['name', 'price', 'description']
    #     writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    #     writer.writeheader()
    #     for product in scraped_data:
    #         writer.writerow(product)
    
except Exception as e:
    print(f"Scraping failed: {str(e)}")
    
finally:
    # Always close the browser at the end
    driver.quit()
`
  },
  {
    id: 'screenshot',
    name: 'Take Screenshots',
    description: 'Takes screenshots of web pages for visual testing.',
    code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import os

# Create screenshots directory if it doesn't exist
if not os.path.exists("screenshots"):
    os.makedirs("screenshots")

# Initialize browser options
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run in headless mode
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--window-size=1920,1080")  # Set window size

# Create a new Chrome browser instance
driver = webdriver.Chrome(options=chrome_options)

# List of pages to screenshot
pages = [
    {"url": "https://example.com", "name": "homepage"},
    {"url": "https://example.com/about", "name": "about-page"},
    {"url": "https://example.com/contact", "name": "contact-page"}
]

try:
    for page in pages:
        # Navigate to the page
        driver.get(page["url"])
        
        # Wait for page to fully load (you might need to adjust this for your specific pages)
        time.sleep(2)
        
        # Take screenshot
        timestamp = time.strftime("%Y%m%d-%H%M%S")
        filename = f"screenshots/{page['name']}-{timestamp}.png"
        driver.save_screenshot(filename)
        
        print(f"Screenshot saved: {filename}")
    
except Exception as e:
    print(f"Screenshot process failed: {str(e)}")
    
finally:
    # Always close the browser at the end
    driver.quit()
`
  }
];
