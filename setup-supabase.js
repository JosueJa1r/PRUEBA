// 🚀 Script de Configuración Rápida para Supabase
// Ejecuta este script en la consola del navegador para configurar Supabase rápidamente

function setupSupabase() {
    console.log('🚀 Configurando Supabase para EmprendeIA...');
    
    // Solicitar credenciales al usuario
    const supabaseUrl = prompt('Ingresa tu Project URL de Supabase (ej: https://tu-proyecto.supabase.co):');
    const supabaseKey = prompt('Ingresa tu anon public key de Supabase:');
    
    if (!supabaseUrl || !supabaseKey) {
        console.error('❌ Credenciales incompletas. Configuración cancelada.');
        return;
    }
    
    // Validar formato de URL
    if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('supabase.co')) {
        console.error('❌ URL de Supabase inválida. Debe ser algo como: https://tu-proyecto.supabase.co');
        return;
    }
    
    // Validar formato de clave
    if (!supabaseKey.startsWith('eyJ')) {
        console.error('❌ Clave de Supabase inválida. Debe empezar con "eyJ"');
        return;
    }
    
    // Actualizar configuración
    if (window.CONFIG) {
        window.CONFIG.SUPABASE.URL = supabaseUrl;
        window.CONFIG.SUPABASE.ANON_KEY = supabaseKey;
        console.log('✅ Configuración actualizada en memoria');
    }
    
    // Crear configuración para localStorage
    const config = {
        SUPABASE: {
            URL: supabaseUrl,
            ANON_KEY: supabaseKey
        }
    };
    
    localStorage.setItem('emprendeia-config', JSON.stringify(config));
    console.log('✅ Configuración guardada en localStorage');
    
    // Probar conexión
    testSupabaseConnection(supabaseUrl, supabaseKey);
}

function testSupabaseConnection(url, key) {
    console.log('🔍 Probando conexión con Supabase...');
    
    try {
        const client = supabase.createClient(url, key);
        
        // Probar una consulta simple
        client.auth.getUser().then(({ data, error }) => {
            if (error) {
                console.error('❌ Error de conexión:', error.message);
                console.log('💡 Verifica que tus credenciales sean correctas');
            } else {
                console.log('✅ Conexión exitosa con Supabase!');
                console.log('🎉 Tu proyecto está listo para usar');
                
                // Recargar la página para aplicar la configuración
                if (confirm('¿Recargar la página para aplicar la nueva configuración?')) {
                    window.location.reload();
                }
            }
        });
    } catch (error) {
        console.error('❌ Error creando cliente de Supabase:', error);
    }
}

function loadConfigFromStorage() {
    const storedConfig = localStorage.getItem('emprendeia-config');
    if (storedConfig) {
        try {
            const config = JSON.parse(storedConfig);
            if (window.CONFIG) {
                window.CONFIG.SUPABASE.URL = config.SUPABASE.URL;
                window.CONFIG.SUPABASE.ANON_KEY = config.SUPABASE.ANON_KEY;
                console.log('✅ Configuración cargada desde localStorage');
                return true;
            }
        } catch (error) {
            console.error('❌ Error cargando configuración:', error);
        }
    }
    return false;
}

// Auto-cargar configuración al iniciar
if (typeof window !== 'undefined') {
    console.log('🔧 Script de configuración de Supabase cargado');
    console.log('💡 Ejecuta setupSupabase() para configurar tu proyecto');
    
    // Intentar cargar configuración existente
    loadConfigFromStorage();
}

// Exportar funciones globalmente
window.setupSupabase = setupSupabase;
window.testSupabaseConnection = testSupabaseConnection;
window.loadConfigFromStorage = loadConfigFromStorage;
