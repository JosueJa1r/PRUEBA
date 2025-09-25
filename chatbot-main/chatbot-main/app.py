import os
from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv
import google.generativeai as genai

# Carga las variables del archivo .env
load_dotenv()

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    try:
        # PASO 1: Obtener la API Key de forma segura DENTRO del request.
        api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
        if not api_key:
            # Si no hay clave, devolvemos un error JSON, no rompemos la app.
            return jsonify({"reply": "Error del servidor: La clave API no está configurada."}), 500

        # PASO 2: Configurar la API DENTRO del request.
        genai.configure(api_key=api_key)

        # PASO 3: Inicializar el modelo.
        model = genai.GenerativeModel("models/gemini-1.5-flash")

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
