# Configuración de Supabase para EmprendeIA

Este documento explica cómo configurar Supabase para el sistema de usuarios y comunidades de EmprendeIA.

## 🚀 Pasos para Configurar Supabase

### 1. Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Haz clic en "New Project"
4. Completa la información del proyecto:
   - **Name**: EmprendeIA
   - **Database Password**: Genera una contraseña segura
   - **Region**: Selecciona la región más cercana
5. Haz clic en "Create new project"

### 2. Configurar Autenticación con Google

1. En el dashboard de Supabase, ve a **Authentication** > **Providers**
2. Habilita **Google** como proveedor
3. Configura las credenciales de Google:
   - Ve a [Google Cloud Console](https://console.cloud.google.com)
   - Crea un nuevo proyecto o selecciona uno existente
   - Habilita la API de Google+ (si está disponible) o Google Identity
   - Ve a **Credentials** > **Create Credentials** > **OAuth 2.0 Client IDs**
   - Configura las URLs autorizadas:
     - **Authorized JavaScript origins**: `https://tu-proyecto.supabase.co`
     - **Authorized redirect URIs**: `https://tu-proyecto.supabase.co/auth/v1/callback`
   - Copia el **Client ID** y **Client Secret** a Supabase

### 3. Configurar la Base de Datos

1. En Supabase, ve a **SQL Editor**
2. Copia y pega el contenido del archivo `supabase-schema.sql`
3. Ejecuta el script para crear todas las tablas y políticas

### 4. Configurar las URLs del Proyecto

1. En Supabase, ve a **Settings** > **API**
2. Copia la **Project URL** y **anon public key**
3. Actualiza el archivo `js/supabase-config.js`:

```javascript
// Reemplaza estas URLs con tus credenciales reales de Supabase
this.supabaseUrl = 'https://tu-proyecto.supabase.co';
this.supabaseAnonKey = 'tu-clave-anonima-aqui';
```

### 5. Configurar Dominios Autorizados

1. En Supabase, ve a **Authentication** > **URL Configuration**
2. Agrega tus dominios autorizados:
   - `http://localhost:3000` (para desarrollo local)
   - `https://tu-dominio.com` (para producción)

## 📊 Estructura de la Base de Datos

### Tablas Principales

- **user_profiles**: Perfiles de usuarios con información personal y profesional
- **forum_posts**: Posts del foro organizados por comunidad y categoría
- **forum_comments**: Comentarios en los posts
- **post_likes**: Likes en posts
- **comment_likes**: Likes en comentarios
- **user_connections**: Conexiones entre usuarios
- **user_messages**: Mensajes privados entre usuarios
- **post_bookmarks**: Posts guardados por usuarios

### Comunidades Soportadas

- **creadoras**: Creadoras del Futuro
- **innovadores**: Innovadores del Futuro
- **legado**: Legado Emprendedor
- **general**: Comunidad General

## 🔐 Seguridad

El esquema incluye:

- **Row Level Security (RLS)** habilitado en todas las tablas
- **Políticas de seguridad** que permiten a los usuarios:
  - Ver todos los perfiles públicos
  - Editar solo su propio perfil
  - Crear y gestionar sus propios posts y comentarios
  - Conectar y enviar mensajes a otros usuarios
- **Triggers automáticos** para actualizar contadores y timestamps

## 🚀 Funcionalidades Implementadas

### Autenticación
- ✅ Login con Google OAuth
- ✅ Gestión de sesiones
- ✅ Perfiles de usuario automáticos

### Foros
- ✅ Posts por comunidad y categoría
- ✅ Sistema de comentarios
- ✅ Likes en posts y comentarios
- ✅ Bookmarks de posts
- ✅ Búsqueda y filtros

### Interacciones Sociales
- ✅ Directorio de usuarios
- ✅ Conexiones entre usuarios
- ✅ Mensajes privados
- ✅ Estados de disponibilidad

### Perfiles de Usuario
- ✅ Información personal y profesional
- ✅ Habilidades e intereses
- ✅ Enlaces sociales
- ✅ Configuración de disponibilidad

## 🛠️ Desarrollo Local

Para desarrollo local sin Supabase:

1. El sistema funciona en **modo simulado** automáticamente
2. Los datos se almacenan en `localStorage`
3. La autenticación se simula con usuarios de prueba
4. Todas las funcionalidades están disponibles para testing

## 📱 Próximos Pasos

1. **Configurar Supabase** siguiendo este documento
2. **Probar la autenticación** con Google
3. **Verificar las funcionalidades** del foro y directorio
4. **Personalizar** los datos de ejemplo según necesidades
5. **Desplegar** en producción

## 🔧 Troubleshooting

### Error de CORS
- Verifica que los dominios estén configurados correctamente en Supabase
- Asegúrate de que las URLs autorizadas incluyan tu dominio

### Error de Autenticación
- Verifica las credenciales de Google OAuth
- Confirma que las URLs de callback estén configuradas correctamente

### Error de Base de Datos
- Ejecuta el script SQL completo
- Verifica que todas las políticas RLS estén creadas
- Confirma que los triggers estén funcionando

## 📞 Soporte

Si tienes problemas con la configuración:

1. Revisa los logs de Supabase en el dashboard
2. Verifica la consola del navegador para errores JavaScript
3. Confirma que todos los archivos estén cargando correctamente
4. Consulta la documentación oficial de Supabase

---

¡Con esta configuración tendrás un sistema completo de usuarios y comunidades funcionando en EmprendeIA! 🚀
