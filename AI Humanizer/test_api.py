import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure the API key
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("API key not found. Please set it in your .env file.")
genai.configure(api_key=api_key)

# Initialize the model
# We'll use 'gemini-1.5-flash' as it's fast and capable
model = genai.GenerativeModel('gemini-1.5-flash')

# Our first prompt!
prompt = "Explain what an API is in one simple sentence."

# Send the prompt to the model
response = model.generate_content(prompt)

# Print the response from the AI
print(response.text)