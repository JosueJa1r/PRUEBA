// Sistema de autenticación simulada mejorado
class SimulatedAuth {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // Verificar si hay un usuario guardado
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUI();
        }
        
        // Configurar eventos de login
        this.setupLoginEvents();
    }

    setupLoginEvents() {
        // Botón de Google
        const googleBtn = document.querySelector('.google-signin-btn');
        if (googleBtn) {
            googleBtn.addEventListener('click', () => this.loginWithGoogle());
        }

        // Botón de login normal
        const loginBtn = document.querySelector('.login-btn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.loginWithEmail());
        }
    }

    loginWithGoogle() {
        // Simular login con Google
        const user = {
            id: 'google_user_' + Date.now(),
            name: 'Usuario EmprendeIA',
            email: 'usuario@emprendeia.com',
            avatar: 'IMG/placeholder-user.jpg',
            provider: 'google',
            community: 'general'
        };

        this.loginUser(user);
    }

    loginWithEmail() {
        const email = document.getElementById('email')?.value;
        const password = document.getElementById('password')?.value;

        if (!email || !password) {
            alert('Por favor completa todos los campos');
            return;
        }

        // Simular login con email
        const user = {
            id: 'email_user_' + Date.now(),
            name: email.split('@')[0],
            email: email,
            avatar: 'IMG/placeholder-user.jpg',
            provider: 'email',
            community: 'general'
        };

        this.loginUser(user);
    }

    loginUser(user) {
        this.currentUser = user;
        
        // Guardar en localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userEmail', user.email);
        
        // Actualizar UI
        this.updateUI();
        
        // Mostrar notificación
        this.showNotification('¡Bienvenido a EmprendeIA!', 'success');
        
        // Mostrar widget de perfil después de un delay
        setTimeout(() => {
            this.showProfileWidget();
        }, 1000);
    }

    updateUI() {
        const loggedInSection = document.getElementById('user-logged-in');
        const loginForm = document.getElementById('login-form');

        if (this.currentUser && loggedInSection && loginForm) {
            // Mostrar sección de usuario logueado
            loggedInSection.style.display = 'block';
            loginForm.style.display = 'none';

            // Actualizar información del usuario
            const userName = document.getElementById('user-name');
            const userEmail = document.getElementById('user-email');
            const userCommunity = document.getElementById('user-community');
            const userAvatar = document.getElementById('user-avatar');

            if (userName) userName.textContent = this.currentUser.name;
            if (userEmail) userEmail.textContent = this.currentUser.email;
            if (userCommunity) userCommunity.textContent = this.currentUser.community;
            if (userAvatar) {
                const savedPhoto = localStorage.getItem('userPhoto');
                userAvatar.src = savedPhoto || this.currentUser.avatar;
            }
        }
    }

    showProfileWidget() {
        const widget = document.getElementById('profile-widget');
        if (widget && this.currentUser) {
            widget.style.display = 'flex';
            
            // Actualizar información del widget
            const widgetName = document.getElementById('widget-name');
            const widgetCommunity = document.getElementById('widget-community');
            const widgetPhoto = document.getElementById('widget-photo');

            if (widgetName) widgetName.textContent = this.currentUser.name;
            if (widgetCommunity) widgetCommunity.textContent = `Comunidad: ${this.currentUser.community}`;
            if (widgetPhoto) {
                const savedPhoto = localStorage.getItem('userPhoto');
                widgetPhoto.src = savedPhoto || this.currentUser.avatar;
            }
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPhoto');
        
        // Ocultar widget
        const widget = document.getElementById('profile-widget');
        if (widget) widget.style.display = 'none';
        
        // Mostrar formulario de login
        const loggedInSection = document.getElementById('user-logged-in');
        const loginForm = document.getElementById('login-form');
        
        if (loggedInSection) loggedInSection.style.display = 'none';
        if (loginForm) loginForm.style.display = 'block';
        
        this.showNotification('Sesión cerrada exitosamente', 'info');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-weight: 600;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Método para actualizar foto de perfil
    updateProfilePhoto(photoDataUrl) {
        if (this.currentUser) {
            localStorage.setItem('userPhoto', photoDataUrl);
            
            // Actualizar todas las fotos en la UI
            const avatars = document.querySelectorAll('#user-avatar, #widget-photo, .profile-photo');
            avatars.forEach(avatar => {
                avatar.src = photoDataUrl;
            });
            
            this.showNotification('Foto de perfil actualizada', 'success');
        }
    }

    // Método para actualizar información del usuario
    updateUserInfo(userData) {
        if (this.currentUser) {
            this.currentUser = { ...this.currentUser, ...userData };
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            
            if (userData.name) localStorage.setItem('userName', userData.name);
            if (userData.email) localStorage.setItem('userEmail', userData.email);
            
            this.updateUI();
            this.showNotification('Información actualizada', 'success');
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    window.simulatedAuth = new SimulatedAuth();
});

// Agregar estilos para las notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
