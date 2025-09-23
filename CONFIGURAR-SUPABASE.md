# 🚀 Configuración Rápida de Supabase para EmprendeIA

Esta guía te ayudará a conectar tu proyecto EmprendeIA con tu cuenta de Supabase en menos de 10 minutos.

## 📋 **Paso 1: Crear Proyecto en Supabase**

### 1.1 Acceder a Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Inicia sesión con tu cuenta o crea una nueva
3. Haz clic en **"New Project"**

### 1.2 Configurar el Proyecto
- **Name**: `EmprendeIA`
- **Database Password**: Genera una contraseña segura (guárdala)
- **Region**: Selecciona la región más cercana a ti
- Haz clic en **"Create new project"**

⏱️ **Espera 2-3 minutos** mientras se crea la base de datos.

## 🔑 **Paso 2: Obtener Credenciales**

### 2.1 Acceder a la Configuración
1. En tu dashboard de Supabase, ve a **Settings** (⚙️)
2. Selecciona **API** en el menú lateral

### 2.2 Copiar Credenciales
Copia estos dos valores:
- **Project URL**: `https://tu-proyecto.supabase.co`
- **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 🔧 **Paso 3: Configurar en tu Proyecto**

### 3.1 Método Rápido (Recomendado)
1. Abre `usuario.html` en tu navegador
2. Abre la **Consola del Navegador** (F12)
3. Ejecuta este comando:
```javascript
setupSupabase()
```
4. Ingresa tu **Project URL** cuando te lo solicite
5. Ingresa tu **anon public key** cuando te lo solicite
6. ¡Listo! La configuración se aplicará automáticamente

### 3.2 Método Manual
1. Abre el archivo `config.js`
2. Reemplaza estos valores:
```javascript
const CONFIG = {
    SUPABASE: {
        URL: 'https://tu-proyecto.supabase.co', // ← Tu Project URL aquí
        ANON_KEY: 'tu-clave-anonima-aqui', // ← Tu anon public key aquí
    }
};
```

## 🗄️ **Paso 4: Configurar la Base de Datos**

### 4.1 Ejecutar el Esquema SQL
1. En Supabase, ve a **SQL Editor**
2. Haz clic en **"New query"**
3. Copia todo el contenido del archivo `supabase-schema.sql`
4. Pégalo en el editor
5. Haz clic en **"Run"**

### 4.2 Verificar Tablas Creadas
Ve a **Table Editor** y verifica que se crearon estas tablas:
- ✅ `user_profiles`
- ✅ `forum_posts`
- ✅ `forum_comments`
- ✅ `post_likes`
- ✅ `comment_likes`
- ✅ `user_connections`
- ✅ `user_messages`
- ✅ `post_bookmarks`

## 🔐 **Paso 5: Configurar Autenticación con Google**

### 5.1 Configurar Google OAuth
1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **Google Identity API**
4. Ve a **Credentials** > **Create Credentials** > **OAuth 2.0 Client IDs**
5. Configura:
   - **Application type**: Web application
   - **Name**: EmprendeIA
   - **Authorized JavaScript origins**: `https://tu-proyecto.supabase.co`
   - **Authorized redirect URIs**: `https://tu-proyecto.supabase.co/auth/v1/callback`

### 5.2 Configurar en Supabase
1. En Supabase, ve a **Authentication** > **Providers**
2. Habilita **Google**
3. Ingresa tu **Client ID** y **Client Secret** de Google
4. Guarda la configuración

## ✅ **Paso 6: Probar la Conexión**

### 6.1 Verificar Configuración
1. Abre `usuario.html` en tu navegador
2. Abre la **Consola del Navegador** (F12)
3. Deberías ver: `✅ Supabase inicializado correctamente`

### 6.2 Probar Autenticación
1. Haz clic en **"Continuar con Google"**
2. Completa el proceso de autenticación
3. Deberías ver tu perfil de usuario

### 6.3 Probar Foros
1. Ve a cualquier comunidad (`creadoras.html`, `innovadores.html`, `legado.html`)
2. Haz clic en la pestaña **"Foro"**
3. Deberías ver el foro interactivo funcionando

## 🚨 **Solución de Problemas**

### Error: "Invalid API key"
- ✅ Verifica que copiaste la clave completa
- ✅ Asegúrate de que no hay espacios extra

### Error: "CORS policy"
- ✅ Verifica que tu dominio esté en las URLs autorizadas
- ✅ Para desarrollo local, usa `http://localhost:3000`

### Error: "Google OAuth"
- ✅ Verifica que las URLs de callback estén configuradas
- ✅ Asegúrate de que el Client ID sea correcto

### Error: "Database connection"
- ✅ Verifica que ejecutaste el script SQL completo
- ✅ Confirma que todas las tablas se crearon

## 🎉 **¡Listo!**

Una vez completados todos los pasos:

- ✅ **Autenticación** con Google funcionando
- ✅ **Base de datos** configurada con todas las tablas
- ✅ **Foros interactivos** con usuarios reales
- ✅ **Directorio de usuarios** funcionando
- ✅ **Mensajería** entre usuarios activa

## 📞 **Soporte**

Si tienes problemas:

1. **Revisa la consola** del navegador para errores
2. **Verifica las credenciales** en Supabase
3. **Confirma que el SQL** se ejecutó correctamente
4. **Prueba la conexión** con el script de configuración

---

**¡Tu proyecto EmprendeIA ahora está conectado con Supabase y listo para usar!** 🚀
