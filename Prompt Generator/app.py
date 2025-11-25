from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("API key not found.")
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')

app = Flask(__name__)
CORS(app)

PROMPT_RULES = {
    "coding": {
        "concise": "1. **Objective:**\n2. **Core Requirements:**",
        "standard": "1. **Objective:**\n2. **Core Requirements:**\n3. **Key Technologies:**\n4. **Implementation Constraints:**",
        "expert": "1. **Objective:**\n2. **Core Requirements:**\n3. **Key Technologies:**\n4. **Implementation Constraints:**\n5. **Success Metrics:**\n6. **Potential Pitfalls:**"
    },
    "text": {
        "concise": "1. **Core Concept:**\n2. **Tone & Style:**",
        "standard": "1. **Core Task:**\n2. **Key Elements:**\n3. **Tone & Style:**\n4. **Audience:**",
        "expert": "1. **Core Task:**\n2. **Key Elements:**\n3. **Tone & Style:**\n4. **Literary Devices:**\n5. **Audience:**\n6. **Forbidden Tropes:**"
    },
    "academic": {"standard": "1. **Thesis Statement:**\n2. **Outline:**\n3. **Key Sources:**\n4. **Required Tone:**"},
    "ppt": {"standard": "1. **Audience & Goal:**\n2. **Slide Outline:**\n3. **Key Visuals:**\n4. **Tone & Style:"},
    "research": {"standard": "1. **Research Question:**\n2. **Methodology:**\n3. **Scope:**\n4. **Keywords:"},
    "image": {"standard": "1. **Subject & Scene:**\n2. **Artistic Style:**\n3. **Technical Details:**\n4. **Mood & Atmosphere:"}
}

def create_meta_prompt(idea, target, detail):
    target_rules = PROMPT_RULES.get(target, PROMPT_RULES["image"])
    rules = target_rules.get(detail, target_rules.get("standard"))

    persona = "Your role is an AI Prompt Engineering Expert."
    goal = f"Your goal is to transform a user's idea into a highly detailed and structured project brief for a specialized AI assistant. The target mode is '{target}' and the required detail level is '{detail}'."

    return f"""{persona} {goal}

You must generate a response that is a structured brief. Follow these overall style rules:
1.  **Use Markdown Formatting:** Use bold headings for each section as defined in the structure below.
2.  **Create a Persona:** The very first section must be titled '**Situation**'. It must creatively define a high-stakes professional role for the user based on their idea (e.g., "You are a lead architect...", "You are a senior data scientist...").
3.  **End with an Ultimatum:** The brief must conclude with a single, dramatic, high-stakes closing sentence to create urgency (e.g., "The fate of the project rests on your shoulders.", "The future of this technology depends on your success.").

Use the following section structure:
{rules}

Now, apply this structured and stylistic approach to the user's idea.

**User Idea:** "{idea}"
"""

@app.route('/generate_prompt', methods=['POST'])
def handle_generation():
    try:
        data = request.get_json()
        user_idea = data.get('idea')
        target = data.get('target', 'coding')
        detail = data.get('detail', 'standard')

        if not user_idea:
            return jsonify({"error": "No idea provided"}), 400

        full_prompt = create_meta_prompt(user_idea, target, detail)
        response = model.generate_content(full_prompt)
        
        return jsonify({"generated_prompt": response.text})

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An internal server error occurred"}), 500

if __name__ == '__main__':

    app.run(debug=True)

