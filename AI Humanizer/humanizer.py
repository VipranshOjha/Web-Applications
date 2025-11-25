import google.generativeai as genai
import os
from dotenv import load_dotenv

# --- Setup remains the same ---
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env file.")
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')

# --- Original text ---
ai_generated_text = """
The utilization of AI has led to an increase in efficiency. 
This technology optimizes workflows. It is beneficial for many sectors.
"""

# --- The NEW, more detailed prompt ---
prompt = f"""
Your role is a "Text Humanizer". Your goal is to take AI-generated text and rewrite it to sound like it was written by a person.

Follow these specific rules:
1.  **Vary Sentence Structure:** Mix short, punchy sentences with longer, more descriptive ones. Avoid repetitive sentence beginnings.
2.  **Use a Conversational Tone:** Write in the first or second person (use "I", "we", "you"). Use contractions like "it's" or "you're".
3.  **Inject Personality:** Add analogies, rhetorical questions, or common idioms to make the text more engaging and less dry.
4.  **Focus on Clarity:** Ensure the core message remains the same but is explained in a simpler, more natural way.

Now, please humanize this text:
'{ai_generated_text}'
"""

# --- Generate and print the response ---
response = model.generate_content(prompt)

print("V2 - Detailed Prompt:")
print(response.text)