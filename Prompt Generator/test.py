import google.generativeai as genai
import os
from dotenv import load_dotenv

# --- Configuration (Same as before) ---
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("API key not found. Please set it in your .env file.")

genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')

# --- The Core Logic ---

# 1. Get a simple idea from the user
user_idea = "A wise, old wizard in a magical forest."

# 2. Construct the meta-prompt
meta_prompt = f"""
Your role is an AI Prompt Engineering Expert. Your goal is to take a user's simple idea and transform it into a detailed, rich, and effective prompt that can be used to generate high-quality AI images or text.

Follow these rules:
1.  **Elaborate on the Core Subject:** Add specific, descriptive details about the subject (e.g., clothing, expression, accessories).
2.  **Describe the Environment:** Build a vivid scene around the subject (e.g., time of day, weather, background details).
3.  **Specify Style and Medium:** Define the artistic style (e.g., "digital painting," "photorealistic," "fantasy art") and any relevant artistic influences.
4.  **Add Technical Details:** Include keywords for lighting, color schemes, and composition.

Based on these rules, transform the following user idea into an expert-level prompt.

**User Idea:** "{user_idea}"
"""

# 3. Call the Gemini API
print("🤖 Generating an expert prompt...")
response = model.generate_content(meta_prompt)

# 4. Print the result
print("\n✅ Your Generated Prompt:")
print("--------------------------")
print(response.text)