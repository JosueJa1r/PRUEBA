// 🚀 VERIFICACIÓN RÁPIDA DE CONFIGURACIÓN SUPABASE
// Ejecuta este script en la consola del navegador para verificar tu configuración

console.log('🔍 VERIFICANDO CONFIGURACIÓN DE SUPABASE...');
console.log('=====================================');

// Verificar configuración
const config = JSON.parse(localStorage.getItem('emprendeia-config') || '{}');
const supabaseConfig = config.SUPABASE;

if (supabaseConfig && supabaseConfig.URL && supabaseConfig.ANON_KEY) {
    console.log('✅ CONFIGURACIÓN ENCONTRADA:');
    console.log('   URL:', supabaseConfig.URL);
    console.log('   Key:', supabaseConfig.ANON_KEY.substring(0, 20) + '...');
    
    // Probar conexión
    console.log('🔄 PROBANDO CONEXIÓN...');
    
    try {
        const client = supabase.createClient(supabaseConfig.URL, supabaseConfig.ANON_KEY);
        
        client.auth.getUser().then(({ data, error }) => {
            if (error) {
                console.log('❌ ERROR DE CONEXIÓN:', error.message);
                console.log('💡 POSIBLES SOLUCIONES:');
                console.log('   1. Verifica que ejecutaste el script SQL en Supabase');
                console.log('   2. Verifica que configuraste los dominios autorizados');
                console.log('   3. Verifica que tu proyecto Supabase esté activo');
            } else {
                console.log('✅ CONEXIÓN EXITOSA!');
                console.log('   Usuario actual:', data.user ? data.user.email : 'No autenticado');
                
                // Probar base de datos
                console.log('🔄 PROBANDO BASE DE DATOS...');
                
                client.from('user_profiles').select('count').then(({ data, error }) => {
                    if (error) {
                        console.log('❌ ERROR DE BASE DE DATOS:', error.message);
                        console.log('💡 SOLUCIÓN: Ejecuta el script SQL en Supabase');
                        console.log('   Ve a: https://supabase.com/dashboard/project/hfxblzrjhdibxdbkxost');
                        console.log('   Haz clic en "SQL Editor" y ejecuta supabase-schema.sql');
                    } else {
                        console.log('✅ BASE DE DATOS FUNCIONANDO!');
                        console.log('🎉 ¡TU CONFIGURACIÓN ESTÁ COMPLETA!');
                        console.log('');
                        console.log('📋 PRÓXIMOS PASOS:');
                        console.log('   1. Ve a usuario.html para probar la autenticación');
                        console.log('   2. Ve a creadoras.html para probar los foros');
                        console.log('   3. Configura Google OAuth si quieres login automático');
                    }
                });
            }
        });
        
    } catch (error) {
        console.log('❌ ERROR CREANDO CLIENTE:', error.message);
    }
    
} else {
    console.log('❌ CONFIGURACIÓN NO ENCONTRADA');
    console.log('💡 SOLUCIÓN: Ejecuta setupSupabase() para configurar');
}

console.log('=====================================');
console.log('💡 Para más información, revisa CHECKLIST-SUPABASE.md');
