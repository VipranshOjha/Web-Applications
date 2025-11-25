# PromptCraft

**Turn simple ideas into powerful, expert-crafted AI prompts.**

🔗 Live Website: https://prompt-craft-eight.vercel.app/

## 💬 **The Problem**
When I used AI assistants like Gemini, ChatGPT, or Claude, I often had ideas in mind but struggled to phrase them as clear, detailed prompts.

* If I wrote prompts casually → the AI gave vague or shallow results.
* If I tried to be precise → it took me too long to structure and refine.
* Online “prompt generators” I found were either too basic or locked behind premium paywalls.

I needed a tool that could:

✅ Transform vague ideas into **structured expert prompts**

✅ Work across multiple **domains** (coding, writing, academic, research, image gen, etc.)

✅ Be free, local, and customizable

---

## ✨ **The Solution**
That’s why I built **PromptCraft**.

It’s a web app that takes your **raw idea** and instantly transforms it into a **professional-grade AI prompt** with structure, persona, and style.

* Powered by **Google Gemini API**
* Backend written in **Flask** (your API key is safe)
* Beautiful frontend with **HTML/CSS/JS**

Now, in seconds, I can go from *“an idea”* → *“an expert-level AI prompt”* ready to use in Gemini, ChatGPT, Claude, or any other AI platform.

---

## 🚀 **Features**

* 🎯 **Precision Prompting** → vague ideas become structured, professional briefs
* 🔧 **Multi-Purpose Modes** → Coding, Story/Text, Academic, Presentation, Research, Image
* ⚡ **Detail Levels** → Concise, Standard, or Expert (choose your depth)
* 🧩 **Persona + Ultimatum Style** → every prompt starts with a role-based situation and ends with a dramatic call-to-action
* 🔒 **Secure Backend** → your Gemini API key never leaves Flask
* 🖥 **Modern UI** → sleek design with instant before/after
* 📋 **One-Click Copy** → grab your crafted prompt instantly
* 🔗 **Quick Links** → send your prompt directly to Gemini, ChatGPT, or Claude

---

## 🛠️ **Tech Stack**

* **Frontend** → HTML, CSS, Vanilla JavaScript
* **Backend** → Python (Flask + Flask-CORS)
* **AI Model** → Google Gemini API

---

## 🖼 Example Run

1️⃣ **Default Page (Before)**
When you first open **PromptCraft**, you see a clean input box for your idea, dropdowns for **prompt type** and **detail level**, and a **“Craft Prompt”** button.

<img width="1144" height="1477" alt="PromptCraft Default Page" src="https://github.com/user-attachments/assets/36a1335f-e159-40e9-996d-a833af77bd08" />  

---

2️⃣ **After Crafting (Expert Prompt)**
**Input Idea:**

```text
Make a presentation about the impact of AI in healthcare.
```

Using **Presentation Mode** with **Concise Detail Level**, PromptCraft transforms this vague idea into a structured, professional AI prompt.

<img width="1052" height="678" alt="PromptCraft Options" src="https://github.com/user-attachments/assets/1a8cbe25-9499-46f7-a901-74f470542452" />  

**Generated Prompt Output:** <img width="1056" height="1075" alt="PromptCraft Generated Prompt" src="https://github.com/user-attachments/assets/54e2c69f-d87e-45be-a5af-448a4c36bcb4" />

---

3️⃣ **One-Click Copy & Export**
With a single click, you can **copy your crafted prompt** or send it directly to **Gemini, ChatGPT, or Claude** for immediate use.

<img width="1069" height="513" alt="PromptCraft Export Options" src="https://github.com/user-attachments/assets/ecba80eb-5559-453d-927f-f562ea782ee8" />  

---

⚙️ **Setup & Usage**

Clone the Repository:

```bash
git clone https://github.com/VipranshOjha/Daily-Problem-Solvers.git
cd Daily-Problem-Solvers/PromptCraft
```

Create the Environment File:

```bash
# .env file
GEMINI_API_KEY=YOUR_SECRET_API_KEY
```

Install Dependencies:

```bash
pip install -r requirements.txt
```

Run the Backend Server:

```bash
python app.py
```

Keep this terminal running.

Open the Frontend:

* Just open `index.html` in your browser.

---

🎉 You’re ready to craft prompts like a pro with **PromptCraft**.

