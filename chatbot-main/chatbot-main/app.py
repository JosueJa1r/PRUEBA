import os
from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv
import google.generativeai as genai

# Carga las variables del archivo .env
load_dotenv()

# Obtiene la API key desde las variables de entorno (prioriza GEMINI_API_KEY para Vercel)
API_KEY = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
if not API_KEY:
    raise ValueError("No se encontró la variable de entorno GEMINI_API_KEY o GOOGLE_API_KEY")

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
        # Preparamos el prompt para darle contexto al modelo
        prompt = f"""Eres EmprendeIA, un asistente experto en emprendimiento. Tu tono es amigable, profesional y motivador. Responde siempre en español.
        El usuario pregunta: {user_input}"""

        # Genera la respuesta del modelo
        response = model.generate_content(prompt)

        # VERIFICACIÓN ROBUSTA: Comprobar si la respuesta tiene contenido o fue bloqueada.
        # La API de Google devuelve una respuesta sin 'parts' si el contenido es bloqueado.
        if response.parts:
            return jsonify({"reply": response.text})
        else:
            # Si no hay 'parts', la respuesta fue bloqueada por seguridad o no se generó.
            return jsonify({"reply": "Lo siento, mi filtro de seguridad ha bloqueado la respuesta. Por favor, intenta con otra pregunta."})
    except Exception as e:
        # Captura errores y devuelve un mensaje amigable
        return jsonify({"reply": f"Ha ocurrido un error en el servidor: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
