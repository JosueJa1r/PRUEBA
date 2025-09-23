// Sistema Global de Estado de Usuario para EmprendeIA
class GlobalUserManager {
    constructor() {
        this.currentUser = null;
        this.isLoggedIn = false;
        this.init();
    }

    init() {
        this.checkLoginStatus();
        this.setupGlobalElements();
        this.bindEvents();
    }

    checkLoginStatus() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.isLoggedIn = true;
            console.log('Usuario logueado:', this.currentUser.name);
        } else {
            this.isLoggedIn = false;
            console.log('Usuario no logueado');
        }
    }

    setupGlobalElements() {
        // Buscar todos los elementos de acceso en la página
        const accessButtons = document.querySelectorAll('.access-btn, .login-btn, .acceder-btn, [id*="access"], [id*="login"]');
        const userProfileElements = document.querySelectorAll('.user-profile-btn, .profile-btn');
        
        console.log('Botones encontrados:', accessButtons.length);
        console.log('Usuario logueado:', this.isLoggedIn);
        
        if (this.isLoggedIn) {
            // Si está logueado, mostrar perfil de usuario
            this.showUserProfile(accessButtons, userProfileElements);
        } else {
            // Si no está logueado, mostrar botón de acceso
            this.showAccessButton(accessButtons, userProfileElements);
        }
    }

    showUserProfile(accessButtons, userProfileElements) {
        const userPhoto = localStorage.getItem('userPhoto') || 'IMG/placeholder-user.jpg';
        const userName = this.currentUser ? this.currentUser.name : 'Usuario';
        const shortUserName = this.getShortUserName(userName);

        // Reemplazar botones de acceso con perfil de usuario
        accessButtons.forEach(button => {
            if (button) {
                // Guardar contenido original si no está guardado
                if (!button.getAttribute('data-original-text')) {
                    button.setAttribute('data-original-text', button.textContent.trim());
                    button.setAttribute('data-original-class', button.className);
                }
                
                button.innerHTML = `
                    <img src="${userPhoto}" alt="Foto de perfil" class="user-profile-img">
                    <span class="user-profile-name">${shortUserName}</span>
                `;
                button.className = button.className.replace(/access-btn|login-btn|acceder-btn/g, 'user-profile-btn');
                button.onclick = () => this.goToProfile();
                
                console.log('Botón convertido a perfil:', shortUserName);
            }
        });

        // Mostrar elementos de perfil de usuario
        userProfileElements.forEach(element => {
            if (element) {
                element.style.display = 'flex';
                const img = element.querySelector('.user-profile-img');
                const name = element.querySelector('.user-profile-name');
                if (img) img.src = userPhoto;
                if (name) name.textContent = shortUserName;
            }
        });
    }

    showAccessButton(accessButtons, userProfileElements) {
        console.log('Mostrando botones de acceso');
        
        // Mostrar botones de acceso
        accessButtons.forEach(button => {
            if (button) {
                // Restaurar contenido original si existe
                const originalText = button.getAttribute('data-original-text') || 'Acceder';
                const originalClass = button.getAttribute('data-original-class') || 'access-btn';
                
                button.innerHTML = `
                    <i class="fas fa-sign-in-alt"></i>
                    ${originalText}
                `;
                button.className = button.className.replace(/user-profile-btn/g, originalClass);
                button.onclick = () => this.goToLogin();
                
                console.log('Botón restaurado:', button.textContent.trim());
            }
        });

        // Ocultar elementos de perfil de usuario
        userProfileElements.forEach(element => {
            if (element) {
                element.style.display = 'none';
            }
        });
    }

    goToProfile() {
        window.location.href = 'perfil.html';
    }

    goToLogin() {
        window.location.href = 'Usuario/usuario.html';
    }

    logout() {
        // Limpiar datos del usuario
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userPhoto');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        
        this.currentUser = null;
        this.isLoggedIn = false;
        
        // Actualizar elementos de la página
        this.setupGlobalElements();
        
        // Mostrar notificación
        this.showNotification('Sesión cerrada exitosamente', 'success');
        
        // Redirigir a página principal después de un delay
        setTimeout(() => {
            window.location.href = 'prueba.html';
        }, 1500);
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

    bindEvents() {
        // Escuchar cambios en localStorage
        window.addEventListener('storage', (e) => {
            if (e.key === 'currentUser') {
                this.checkLoginStatus();
                this.setupGlobalElements();
            }
        });

        // Escuchar eventos personalizados
        window.addEventListener('userLogin', () => {
            this.checkLoginStatus();
            this.setupGlobalElements();
        });

        window.addEventListener('userLogout', () => {
            this.logout();
        });
    }

    // Método público para actualizar el estado
    updateUserStatus() {
        this.checkLoginStatus();
        this.setupGlobalElements();
    }

    // Método público para obtener el estado
    getUserStatus() {
        return {
            isLoggedIn: this.isLoggedIn,
            user: this.currentUser
        };
    }

    // Método público para forzar actualización
    forceUpdate() {
        console.log('Forzando actualización del sistema global');
        this.checkLoginStatus();
        this.setupGlobalElements();
    }

    // Método para acortar el nombre de usuario
    getShortUserName(fullName) {
        if (!fullName) return 'Usuario';
        
        // Si el nombre es muy largo, acortarlo
        if (fullName.length > 15) {
            // Tomar solo el primer nombre
            const firstName = fullName.split(' ')[0];
            return firstName.length > 12 ? firstName.substring(0, 12) + '...' : firstName;
        }
        
        return fullName;
    }
}

// Estilos CSS globales para el perfil de usuario
const globalStyles = `
    .user-profile-btn {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 8px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        color: white !important;
        border: none !important;
        padding: 10px 16px !important;
        border-radius: 25px !important;
        cursor: pointer !important;
        transition: all 0.3s ease !important;
        text-decoration: none !important;
        font-weight: 600 !important;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3) !important;
        white-space: nowrap !important;
        text-align: center !important;
        width: 100% !important;
    }

    .user-profile-btn:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4) !important;
        background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%) !important;
    }

    .user-profile-img {
        width: 32px !important;
        height: 32px !important;
        border-radius: 50% !important;
        border: 2px solid rgba(255, 255, 255, 0.3) !important;
        object-fit: cover !important;
    }

    .user-profile-name {
        font-size: 14px !important;
        font-weight: 600 !important;
        color: white !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        max-width: 120px !important;
    }

    .access-btn {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 8px;
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
        color: white !important;
        border: none !important;
        padding: 12px 20px !important;
        border-radius: 25px !important;
        cursor: pointer !important;
        transition: all 0.3s ease !important;
        text-decoration: none !important;
        font-weight: 600 !important;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3) !important;
        text-align: center !important;
        width: 100% !important;
    }

    .access-btn:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4) !important;
        background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%) !important;
    }

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

// Agregar estilos globales
const styleSheet = document.createElement('style');
styleSheet.textContent = globalStyles;
document.head.appendChild(styleSheet);

// Inicializar el gestor global cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.globalUserManager = new GlobalUserManager();
    
    // Forzar actualización después de un pequeño delay para asegurar que todos los elementos estén cargados
    setTimeout(() => {
        if (window.globalUserManager) {
            window.globalUserManager.forceUpdate();
        }
    }, 500);
});

// También ejecutar cuando la página esté completamente cargada
window.addEventListener('load', () => {
    if (window.globalUserManager) {
        window.globalUserManager.forceUpdate();
    }
});

// Exportar para uso en otros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GlobalUserManager;
}
