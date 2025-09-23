// 🚀 CONFIGURACIÓN ESPECÍFICA PARA TU PROYECTO SUPABASE
// Proyecto: hfxblzrjhdibxdbkxost.supabase.co

const SUPABASE_CONFIG = {
    URL: 'https://hfxblzrjhdibxdbkxost.supabase.co',
    ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmeGJsenJqaGRpYnhkYmt4b3N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MDUxODIsImV4cCI6MjA3NDE4MTE4Mn0.sBRjguhd0e92HK2ELMrNp4enMD9AT3iItq29FwNFLyk'
};

// Guardar en localStorage para uso inmediato
localStorage.setItem('emprendeia-config', JSON.stringify({
    SUPABASE: SUPABASE_CONFIG
}));

console.log('✅ Configuración de Supabase actualizada para tu proyecto');
console.log('🔗 URL:', SUPABASE_CONFIG.URL);
console.log('🔑 Key:', SUPABASE_CONFIG.ANON_KEY.substring(0, 20) + '...');

// Exportar para uso global
window.SUPABASE_CONFIG = SUPABASE_CONFIG;
