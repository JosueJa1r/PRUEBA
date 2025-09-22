import os
from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv
import google.generativeai as genai

# Carga las variables del archivo .env
load_dotenv()

# Obtiene la API key desde la variable de entorno
API_KEY = os.getenv("GOOGLE_API_KEY")
if not API_KEY:
    raise ValueError("No se encontró la variable de entorno GOOGLE_API_KEY")

# Configuración API key para Gemini AI
genai.configure(api_key=API_KEY)

app = Flask(__name__)

# Crea una instancia del modelo Gemini-Pro
model = genai.GenerativeModel("models/gemini-1.5-flash")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    try:
        # Genera la respuesta del modelo
        response = model.generate_content(user_input)
        return jsonify({"reply": response.text})
    except Exception as e:
        # Captura errores y devuelve un mensaje amigable
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
