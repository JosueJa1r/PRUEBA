// 🔧 CONFIGURACIÓN DE EMPRENDEIA
// Configuración actualizada con credenciales reales de Supabase

const CONFIG = {
    // Supabase Configuration
    SUPABASE: {
        // Credenciales reales de tu proyecto Supabase
        URL: 'https://hfxblzrjhdibxdbkxost.supabase.co',
        ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmeGJsenJqaGRpYnhkYmt4b3N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MDUxODIsImV4cCI6MjA3NDE4MTE4Mn0.sBRjguhd0e92HK2ELMrNp4enMD9AT3iItq29FwNFLyk',
    },
    
    // Google OAuth Configuration (opcional - se configura en Supabase)
    GOOGLE: {
        CLIENT_ID: 'tu-google-client-id', // ← Solo si quieres configurar Google OAuth manualmente
    },
    
    // App Configuration
    APP: {
        NAME: 'EmprendeIA',
        VERSION: '1.0.0',
        ENVIRONMENT: 'production', // Cambiado a production con credenciales reales
    }
};

// Exportar configuración
window.CONFIG = CONFIG;
