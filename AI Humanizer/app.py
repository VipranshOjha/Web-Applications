from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

CORS(app)
# --- Securely Configure the Gemini API Key ---
try:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY not found in .env file. Please ensure it is set.")
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-1.5-flash')
except Exception as e:
    print(f"FATAL ERROR: Could not configure Gemini API. {e}")
    model = None

@app.route('/humanize', methods=['POST'])
def humanize_text():
    # Check if the model was initialized correctly
    if not model:
        return jsonify({"error": "Server is not configured correctly. Check API key."}), 500

    # Get the data sent from the frontend
    data = request.get_json()
    input_text = data.get('text', '')
    tone = data.get('tone', '')

    if not input_text or not tone:
        return jsonify({"error": "Missing 'text' or 'tone' in the request."}), 400

    try:
        # Construct the detailed prompt for the Gemini API
        prompt = f"""Your role is a "Text Humanizer". Your goal is to take the following AI-generated text and rewrite it to sound like it was written by a person.

Your tone should be: **{tone}**.

Follow these rules:
1.  Vary Sentence Structure: Mix short, punchy sentences with longer, more descriptive ones.
2.  Use a Conversational Style: Use contractions and a natural, less formal style.
3.  Inject Personality: Add analogies or rhetorical questions where appropriate.

Now, please humanize this text:
'{input_text}'
"""
        
        # Call the Gemini API securely from the server
        response = model.generate_content(prompt)
        
        # Send the successful result back to the frontend
        return jsonify({'humanized_text': response.text})

    except Exception as e:
        # Handle potential errors during the API call
        print(f"Error during API call: {e}")
        return jsonify({"error": "An error occurred while processing your request."}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
