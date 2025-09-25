# EmprendeIA - Plataforma de Formación para Emprendedores

Este repositorio contiene el código fuente completo del sitio web de **EmprendeIA**, una plataforma educativa de vanguardia diseñada para proporcionar a los emprendedores las herramientas, el conocimiento y el acompañamiento necesarios para transformar sus ideas en negocios exitosos.

## Descripción

EmprendeIA es una aplicación web que combina un frontend estático informativo con un backend dinámico para su chatbot de inteligencia artificial. La plataforma ofrece:

- **Catálogo de Cursos**: Una amplia gama de microcursos, cursos de finanzas y bootcamps intensivos.
- **Páginas Informativas**: Secciones detalladas sobre la misión de EmprendeIA, el equipo fundador y testimonios.
- **Comunidades**: Espacios dedicados para diferentes perfiles de emprendedores como "Creadoras IA" e "Innovadores del Futuro".
- **AI Studio (Chatbot)**: Un asistente de IA impulsado por la API de Google Gemini, que se ejecuta en un servidor Flask (Python) para proporcionar consejos de emprendimiento de forma segura.

### Tecnologías Utilizadas
- **Frontend**: HTML5, CSS3, JavaScript (ES6).
- **Backend (Chatbot)**: Python con el micro-framework Flask.
- **Inteligencia Artificial**: API de Google Gemini (`gemini-1.5-flash`).
- **Despliegue**: Preparado para Vercel, tanto para el frontend estático como para el backend de Python.

## Estructura del Proyecto

```
/
├── prueba.html                     # Página principal (landing page)
├── nosotros.html                   # Página "Sobre Nosotros"
├── chatbot.html                    # Interfaz del chatbot (se conecta al backend)
├── perfil.html                     # Página de perfil de usuario
├── script.js                       # Scripts principales para el frontend
│
├── STYLES/
│   └── prueba-style.css            # Hoja de estilos principal
│
├── Cursos/
│   ├── index_*.html                # Páginas de detalle para cada curso
│   └── style.css                   # Estilos específicos para las páginas de cursos
│
├── js/
│   ├── global-user-manager.js      # Lógica para gestionar el estado del usuario
│   └── mock-google-auth.js         # Simulación de autenticación para desarrollo
│
├── IMG/
│   └── ... (imágenes, logos y recursos visuales)
│
└── chatbot-main/                   # Backend de la aplicación del Chatbot (Python/Flask)
    └── chatbot-main/
        ├── app.py                  # Servidor Flask que maneja la lógica del chat
        ├── requirements.txt        # Dependencias de Python para el servidor
        ├── vercel.json             # Configuración de despliegue para Vercel
        ├── .env                    # Archivo para variables de entorno locales (API Keys)
        └── templates/
            └── index.html          # Plantilla HTML que sirve el chatbot
```

