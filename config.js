// 🔧 CONFIGURACIÓN DE EMPRENDEIA
// Configuración principal del proyecto

const CONFIG = {
    // Supabase Configuration
    SUPABASE: {
        URL: 'https://hfxblzrjhdibxdbkxost.supabase.co',
        ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmeGJsenJqaGRpYnhkYmt4b3N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MDUxODIsImV4cCI6MjA3NDE4MTE4Mn0.sBRjguhd0e92HK2ELMrNp4enMD9AT3iItq29FwNFLyk',
    },
    
    // Configuración de Autenticación
    AUTH: {
        MODE: 'mock', // 'mock' para simulado, 'real' para Google OAuth real
        PROVIDER: 'google_mock',
        ENABLE_REAL_GOOGLE: false, // Cambiar a true cuando quieras usar Google real
    },
    
    // Google OAuth Configuration (para cuando se habilite)
    GOOGLE: {
        CLIENT_ID: 'TU_GOOGLE_CLIENT_ID_AQUI',
        CLIENT_SECRET: 'TU_GOOGLE_CLIENT_SECRET_AQUI',
        REDIRECT_URI: 'https://hfxblzrjhdibxdbkxost.supabase.co/auth/v1/callback',
    },
    
    // App Configuration
    APP: {
        NAME: 'EmprendeIA',
        VERSION: '1.0.0',
        ENVIRONMENT: 'development',
        DOMAIN: 'hfxblzrjhdibxdbkxost.supabase.co'
    }
};

// Funciones de configuración
function aplicarConfiguracion() {
    localStorage.setItem('emprendeia-config', JSON.stringify(CONFIG));
    window.CONFIG = CONFIG;
    console.log('🔧 Configuración aplicada');
    return true;
}

function habilitarGoogleReal() {
    CONFIG.AUTH.MODE = 'real';
    CONFIG.AUTH.ENABLE_REAL_GOOGLE = true;
    CONFIG.APP.ENVIRONMENT = 'production';
    
    localStorage.setItem('emprendeia-config', JSON.stringify(CONFIG));
    window.CONFIG = CONFIG;
    
    console.log('🔐 Modo Google OAuth real habilitado');
    console.log('⚠️ Asegúrate de tener las credenciales de Google configuradas');
}

function habilitarModoSimulado() {
    CONFIG.AUTH.MODE = 'mock';
    CONFIG.AUTH.ENABLE_REAL_GOOGLE = false;
    CONFIG.APP.ENVIRONMENT = 'development';
    
    localStorage.setItem('emprendeia-config', JSON.stringify(CONFIG));
    window.CONFIG = CONFIG;
    
    console.log('🎭 Modo simulado habilitado');
}

function verificarModo() {
    const config = localStorage.getItem('emprendeia-config');
    if (config) {
        const parsedConfig = JSON.parse(config);
        return parsedConfig.AUTH?.MODE || 'mock';
    }
    return 'mock';
}

// Exportar configuración y funciones
window.CONFIG = CONFIG;
window.configManager = {
    aplicar: aplicarConfiguracion,
    habilitarReal: habilitarGoogleReal,
    habilitarSimulado: habilitarModoSimulado,
    verificarModo: verificarModo
};

// Auto-aplicar configuración
aplicarConfiguracion();

console.log('🚀 EmprendeIA configurado y listo');
