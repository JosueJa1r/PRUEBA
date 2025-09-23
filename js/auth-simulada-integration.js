// 🔗 INTEGRACIÓN DE AUTENTICACIÓN SIMULADA
// Este archivo integra el sistema de autenticación simulada con las páginas existentes

// Cargar scripts necesarios
function cargarScripts() {
    return new Promise((resolve) => {
        // Cargar configuración
        if (!window.CONFIG) {
            const configScript = document.createElement('script');
            configScript.src = 'config.js';
            configScript.onload = () => {
                // Cargar sistema de autenticación simulada
                if (!window.mockGoogleAuth) {
                    const mockScript = document.createElement('script');
                    mockScript.src = 'js/mock-google-auth.js';
                    mockScript.onload = resolve;
                    document.head.appendChild(mockScript);
                } else {
                    resolve();
                }
            };
            document.head.appendChild(configScript);
        } else {
            resolve();
        }
    });
}

// Función para inicializar autenticación en cualquier página
async function inicializarAuthSimulada() {
    try {
        await cargarScripts();
        
        console.log('🎭 Sistema de autenticación simulada inicializado');
        
        // Verificar si hay usuario autenticado
        const authSystem = window.mockGoogleAuth;
        if (authSystem && authSystem.isSignedIn()) {
            const user = authSystem.getCurrentUser();
            console.log('✅ Usuario autenticado:', user.name);
            return user;
        }
        
        return null;
    } catch (error) {
        console.error('❌ Error inicializando autenticación simulada:', error);
        return null;
    }
}

// Función para manejar botones de login
function configurarBotonesLogin() {
    // Buscar botones de login con Google
    const botonesLogin = document.querySelectorAll('[data-login-google], .google-login-btn, .btn-login-google');
    
    botonesLogin.forEach(boton => {
        boton.addEventListener('click', async (e) => {
            e.preventDefault();
            
            try {
                const authSystem = window.mockGoogleAuth;
                if (authSystem) {
                    const result = await authSystem.signInWithGoogle();
                    
                    if (result.error) {
                        console.error('Error en login:', result.error);
                        alert('Error en el login: ' + result.error.message);
                    } else {
                        console.log('Login exitoso:', result.data.user.name);
                        // La redirección se maneja automáticamente en el sistema de autenticación
                        // No necesitamos hacer nada aquí
                    }
                } else {
                    console.error('Sistema de autenticación no disponible');
                }
            } catch (error) {
                console.error('Error en login:', error);
                alert('Error en el login: ' + error.message);
            }
        });
    });
}

// Función para mostrar información del usuario
function mostrarInfoUsuario(containerId = 'user-info') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const authSystem = window.mockGoogleAuth;
    if (authSystem && authSystem.isSignedIn()) {
        const user = authSystem.getCurrentUser();
        
        container.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px; padding: 15px; background: rgba(76, 175, 80, 0.1); border-radius: 10px; border-left: 4px solid #4CAF50;">
                <img src="${user.avatar_url}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
                <div>
                    <h3 style="margin: 0; color: #4CAF50;">${user.name}</h3>
                    <p style="margin: 2px 0; color: #666;">${user.email}</p>
                    <p style="margin: 2px 0; color: #888; font-size: 14px;">Comunidad: ${user.community}</p>
                </div>
                <button onclick="cerrarSesionSimulada()" style="margin-left: auto; background: #f44336; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">
                    Cerrar Sesión
                </button>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div style="text-align: center; padding: 20px; background: rgba(255, 152, 0, 0.1); border-radius: 10px; border-left: 4px solid #ff9800;">
                <p style="margin: 0; color: #ff9800;">No hay usuario autenticado</p>
                <button onclick="iniciarLoginSimulado()" style="margin-top: 10px; background: #4CAF50; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                    🎭 Simular Login con Google
                </button>
            </div>
        `;
    }
}

// Función para iniciar login simulado
async function iniciarLoginSimulado() {
    try {
        const authSystem = window.mockGoogleAuth;
        if (authSystem) {
            const result = await authSystem.signInWithGoogle();
            
            if (result.error) {
                console.error('Error en login:', result.error);
                alert('Error en el login: ' + result.error.message);
            } else {
                console.log('Login exitoso:', result.data.user.name);
                // La redirección se maneja automáticamente en el sistema de autenticación
                // No necesitamos hacer nada aquí
            }
        }
    } catch (error) {
        console.error('Error en login:', error);
        alert('Error en el login: ' + error.message);
    }
}

// Función para cerrar sesión simulada
async function cerrarSesionSimulada() {
    try {
        const authSystem = window.mockGoogleAuth;
        if (authSystem) {
            await authSystem.signOut();
            console.log('Sesión cerrada');
            // Actualizar la información del usuario
            mostrarInfoUsuario();
            // Recargar la página
            setTimeout(() => window.location.reload(), 500);
        }
    } catch (error) {
        console.error('Error cerrando sesión:', error);
    }
}

// Función para obtener usuarios de una comunidad
function obtenerUsuariosComunidad(comunidad) {
    const authSystem = window.mockGoogleAuth;
    if (authSystem) {
        return authSystem.getCommunityUsers(comunidad);
    }
    return [];
}

// Función para verificar si el usuario pertenece a una comunidad
function verificarComunidadUsuario(comunidad) {
    const authSystem = window.mockGoogleAuth;
    if (authSystem && authSystem.isSignedIn()) {
        const user = authSystem.getCurrentUser();
        return user.community === comunidad || user.community === 'general';
    }
    return false;
}

// Auto-inicializar cuando se carga el DOM
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 Inicializando integración de autenticación simulada...');
    
    try {
        await inicializarAuthSimulada();
        configurarBotonesLogin();
        
        // Mostrar información del usuario si hay un contenedor
        mostrarInfoUsuario();
        
        console.log('✅ Integración de autenticación simulada lista');
    } catch (error) {
        console.error('❌ Error en inicialización:', error);
    }
});

// Exportar funciones globalmente
window.authSimulada = {
    inicializar: inicializarAuthSimulada,
    mostrarUsuario: mostrarInfoUsuario,
    iniciarLogin: iniciarLoginSimulado,
    cerrarSesion: cerrarSesionSimulada,
    obtenerUsuariosComunidad: obtenerUsuariosComunidad,
    verificarComunidad: verificarComunidadUsuario
};
