// 🔧 MODO SIMULADO PARA DESARROLLO
// Este script permite probar la aplicación sin configurar Google OAuth

class SimulatedAuth {
    constructor() {
        this.isSimulated = true;
        this.currentUser = null;
        this.init();
    }

    init() {
        // Detectar si estamos en modo desarrollo
        if (this.isDevelopmentMode()) {
            console.log('🔧 Modo simulado activado para desarrollo');
            this.setupSimulatedAuth();
        }
    }

    isDevelopmentMode() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.protocol === 'file:';
    }

    setupSimulatedAuth() {
        // Interceptar clicks en Google signin
        document.addEventListener('click', (e) => {
            if (e.target.closest('.google-signin-btn')) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                this.simulateGoogleLogin();
                return false;
            }
        });

        // Interceptar clicks en login con email
        document.addEventListener('click', (e) => {
            if (e.target.closest('.login-btn')) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                this.simulateEmailLogin();
                return false;
            }
        });

        // Interceptar formularios
        document.addEventListener('submit', (e) => {
            if (e.target.closest('.login-form')) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                this.simulateEmailLogin();
                return false;
            }
        });
    }

    simulateGoogleLogin() {
        const mockUser = {
            id: 'mock-user-' + Date.now(),
            email: 'usuario@emprendeia.com',
            user_metadata: {
                full_name: 'Usuario EmprendeIA',
                avatar_url: 'IMG/placeholder-user.jpg'
            }
        };

        this.currentUser = mockUser;
        this.updateUI();
        
        // Mostrar mensaje de éxito
        alert('✅ Login simulado exitoso!\n\nUsuario: ' + mockUser.user_metadata.full_name + '\nEmail: ' + mockUser.email);
        
        console.log('🔧 Usuario simulado creado:', mockUser);
        
        // NO redirigir a Google - quedarse en la página
        console.log('🔧 Modo simulado: NO redirigiendo a Google');
    }

    simulateEmailLogin() {
        const email = document.getElementById('email')?.value || 'test@emprendeia.com';
        const password = document.getElementById('password')?.value || '123456';

        if (!email || !password) {
            alert('❌ Por favor ingresa email y contraseña');
            return;
        }

        const mockUser = {
            id: 'mock-user-' + Date.now(),
            email: email,
            user_metadata: {
                full_name: email.split('@')[0],
                avatar_url: 'IMG/placeholder-user.jpg'
            }
        };

        this.currentUser = mockUser;
        this.updateUI();
        
        alert('✅ Login simulado exitoso!\n\nUsuario: ' + mockUser.user_metadata.full_name + '\nEmail: ' + mockUser.email);
        
        console.log('🔧 Usuario simulado creado:', mockUser);
    }

    updateUI() {
        const loggedInSection = document.getElementById('user-logged-in');
        const loginForm = document.getElementById('login-form');

        if (this.currentUser && loggedInSection && loginForm) {
            loggedInSection.style.display = 'block';
            loginForm.style.display = 'none';

            const avatarElement = document.getElementById('user-avatar');
            const nameElement = document.getElementById('user-name');
            const emailElement = document.getElementById('user-email');
            const communityElement = document.getElementById('user-community');

            if (avatarElement) avatarElement.src = this.currentUser.user_metadata?.avatar_url || 'IMG/placeholder-user.jpg';
            if (nameElement) nameElement.textContent = this.currentUser.user_metadata?.full_name || this.currentUser.email;
            if (emailElement) emailElement.textContent = this.currentUser.email;
            if (communityElement) communityElement.textContent = 'Comunidad: EmprendeIA';
        } else if (loggedInSection && loginForm) {
            // Usuario no logueado
            loggedInSection.style.display = 'none';
            loginForm.style.display = 'block';
        }
    }

    getUser() {
        return this.currentUser;
    }
}

// Inicializar modo simulado
document.addEventListener('DOMContentLoaded', () => {
    window.simulatedAuth = new SimulatedAuth();
});
