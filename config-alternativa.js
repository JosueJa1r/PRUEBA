// 🔧 CONFIGURACIÓN ALTERNATIVA PARA DIAGNÓSTICO
// Esta configuración se puede usar para probar la conexión

const CONFIG_ALTERNATIVA = {
    SUPABASE: {
        URL: 'https://hfxblzrjhdibxdbkxost.supabase.co',
        ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmeGJsenJqaGRpYnhkYmt4b3N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MDUxODIsImV4cCI6MjA3NDE4MTE4Mn0.sBRjguhd0e92HK2ELMrNp4enMD9AT3iItq29FwNFLyk'
    }
};

// Guardar configuración alternativa
localStorage.setItem('emprendeia-config', JSON.stringify(CONFIG_ALTERNATIVA));

console.log('✅ Configuración alternativa guardada');
console.log('🔄 Recarga la página y vuelve a ejecutar los tests');
