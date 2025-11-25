# TextLoom ✨

*Weaving AI text into natural human flow, powered by the Gemini API*

🔗 Live Website: https://text-loom-neon.vercel.app/

## 💬 The Problem

I rely heavily on AI language models for brainstorming, drafting, and summarizing. While they’re great at speed and structure, the outputs often feel **robotic** — lacking the rhythm, personality, and quirks of natural human writing.

When I searched for online “AI humanizers,” I ran into two big issues:

* **Expensive Subscriptions** → Most good tools are locked behind monthly paywalls.
* **Severe Character Limits** → Free versions barely allowed me to humanize a single paragraph.

That made them impractical for real-world use. I needed something:

✅ Free to run

✅ Capable of handling longer text

✅ Flexible enough to let me choose the tone

---

## ✨ The Solution

That’s why I built **TextLoom** — a local tool that transforms sterile AI text into **natural, engaging, human-like writing**.

* Uses the **Google Gemini API** through a Flask backend (keeping my API key safe).
* Runs as a **single-page web app**, lightweight and easy to use.
* No subscriptions. No limits. Just **reliable text humanization** whenever I need it.

---

## 🚀 Features

* 🎯 **Natural Language Conversion** → Smooth, conversational phrasing that feels alive.
* 🎨 **Multiple Tone Selection** → Conversational, Professional, Friendly, Witty, Casual, Creative, Academic.
* 🔒 **Secure Backend** → Flask server ensures your Gemini API key is never exposed.
* 🖥 **Clean & Modern UI** → Sleek design for a seamless experience.
* 📋 **One-Click Copy** → Copy results instantly.
* 🔢 **Character Counter** → Keep track of input length as you write.
* ⚡ **Before/After Comparison** → Instantly see how your text improves.

---

## 🛠️ Tech Stack

* **Frontend** → HTML, CSS, Vanilla JavaScript
* **Backend** → Python (Flask)
* **AI Model** → Google Gemini API

---

## ✍️ Quick Demo

**Input:**
`"AI aims to create machines that can exhibit intelligent behaviors like learning, reasoning, and perception."`

**Output (Conversational tone):**
*"AI’s goal is to build machines that don’t just follow instructions but actually learn, think, and make sense of the world — kind of like us figuring things out step by step."*

---

## 🖼 Example Run

1️⃣ **Default Page** <img width="1103" height="1082" alt="Default Page" src="https://github.com/user-attachments/assets/2ee6ff64-94e7-48ad-8ecf-e274bc5261e6" />

2️⃣ **After Humanization**
*Input: `"AI aims to create machines that can exhibit intelligent behaviors like learning, reasoning, and perception."`*

<img width="1108" height="1408" alt="After Humanization" src="https://github.com/user-attachments/assets/049b0fdf-9a43-4a18-ab18-ac19354fb3e7" />  

---

## ⚙️ Setup & Usage

```bash
# Clone the Repository
git clone https://github.com/VipranshOjha/Daily-Problem-Solvers.git
cd Daily-Problem-Solvers/TextLoom
```

# Create the Environment File (.env)
```
echo "GEMINI_API_KEY=YOUR_SECRET_API_KEY_HERE" > .env
```

# Install Dependencies
```
pip install -r requirements.txt
```
# Run the Backend Server
```
python app.py
```

Keep this terminal running.

Now open **`index.html`** in your browser.
🎉 You’re ready to use **TextLoom**!

---

💡 Built with ❤️ to make AI text feel more human.
Try it out and share your feedback! 🚀

