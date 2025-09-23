// 🔍 DIAGNÓSTICO DE CONEXIÓN SUPABASE
// Ejecuta este script en la consola del navegador para diagnosticar problemas de conexión

console.log('🔍 DIAGNOSTICANDO CONEXIÓN CON SUPABASE...');
console.log('=====================================');

// Verificar configuración
const config = JSON.parse(localStorage.getItem('emprendeia-config') || '{}');
const supabaseConfig = config.SUPABASE;

if (!supabaseConfig || !supabaseConfig.URL || !supabaseConfig.ANON_KEY) {
    console.log('❌ ERROR: Configuración no encontrada en localStorage');
    console.log('💡 SOLUCIÓN: Ejecuta setupSupabase() para configurar');
    return;
}

console.log('✅ CONFIGURACIÓN ENCONTRADA:');
console.log('   URL:', supabaseConfig.URL);
console.log('   Key:', supabaseConfig.ANON_KEY.substring(0, 20) + '...');

// Test 1: Verificar conectividad básica
console.log('🔄 TEST 1: Verificando conectividad básica...');
fetch(supabaseConfig.URL + '/rest/v1/', {
    method: 'GET',
    headers: {
        'apikey': supabaseConfig.ANON_KEY,
        'Authorization': 'Bearer ' + supabaseConfig.ANON_KEY
    }
})
.then(response => {
    if (response.ok) {
        console.log('✅ TEST 1 PASÓ: Conectividad básica OK');
        
        // Test 2: Verificar autenticación
        console.log('🔄 TEST 2: Verificando autenticación...');
        return supabase.createClient(supabaseConfig.URL, supabaseConfig.ANON_KEY).auth.getUser();
    } else {
        console.log('❌ TEST 1 FALLÓ: Error de conectividad');
        console.log('   Status:', response.status);
        console.log('   Status Text:', response.statusText);
        throw new Error('Conectividad fallida');
    }
})
.then(({ data, error }) => {
    if (error) {
        console.log('❌ TEST 2 FALLÓ: Error de autenticación');
        console.log('   Error:', error.message);
        
        if (error.message.includes('provider is not enabled')) {
            console.log('💡 SOLUCIÓN: Google OAuth no está configurado (esto es normal)');
        } else if (error.message.includes('Invalid API key')) {
            console.log('💡 SOLUCIÓN: Verifica tu ANON_KEY en config.js');
        } else if (error.message.includes('CORS')) {
            console.log('💡 SOLUCIÓN: Problema de CORS - verifica dominios autorizados en Supabase');
        }
    } else {
        console.log('✅ TEST 2 PASÓ: Autenticación OK');
        console.log('   Usuario:', data.user ? data.user.email : 'No autenticado');
    }
    
    // Test 3: Verificar base de datos
    console.log('🔄 TEST 3: Verificando base de datos...');
    return supabase.createClient(supabaseConfig.URL, supabaseConfig.ANON_KEY).from('user_profiles').select('count');
})
.then(({ data, error }) => {
    if (error) {
        console.log('❌ TEST 3 FALLÓ: Error de base de datos');
        console.log('   Error:', error.message);
        
        if (error.message.includes('relation "user_profiles" does not exist')) {
            console.log('💡 SOLUCIÓN: Ejecuta el script SQL en Supabase');
        } else if (error.message.includes('permission denied')) {
            console.log('💡 SOLUCIÓN: Verifica las políticas RLS en Supabase');
        }
    } else {
        console.log('✅ TEST 3 PASÓ: Base de datos OK');
        console.log('   Registros en user_profiles:', data.length);
    }
    
    console.log('=====================================');
    console.log('🎯 DIAGNÓSTICO COMPLETADO');
    
})
.catch(error => {
    console.log('❌ ERROR GENERAL:', error.message);
    console.log('💡 POSIBLES CAUSAS:');
    console.log('   1. Problema de conectividad a internet');
    console.log('   2. Firewall bloqueando la conexión');
    console.log('   3. URL o clave incorrecta');
    console.log('   4. Proyecto Supabase inactivo');
});

console.log('=====================================');
console.log('💡 Para más información, revisa la consola del navegador');
