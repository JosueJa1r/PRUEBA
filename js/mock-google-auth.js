// 🎭 SISTEMA DE AUTENTICACIÓN SIMULADA PARA GOOGLE OAUTH
// Este sistema simula el login con Google sin conectarse realmente

class MockGoogleAuth {
    constructor() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.mockUsers = this.crearUsuariosMock();
        this.init();
    }

    // Crear usuarios de prueba
    crearUsuariosMock() {
        return [
            {
                id: 'mock_user_1',
                email: 'ana.creadora@emprendeia.com',
                name: 'Ana García',
                avatar_url: 'IMG/placeholder-user.jpg',
                community: 'creadoras',
                bio: 'Emprendedora apasionada por la tecnología y el impacto social',
                created_at: new Date().toISOString(),
                last_sign_in: new Date().toISOString()
            },
            {
                id: 'mock_user_2',
                email: 'carlos.innovador@emprendeia.com',
                name: 'Carlos Rodríguez',
                avatar_url: 'IMG/placeholder-user.jpg',
                community: 'innovadores',
                bio: 'Innovador tecnológico con experiencia en startups',
                created_at: new Date().toISOString(),
                last_sign_in: new Date().toISOString()
            },
            {
                id: 'mock_user_3',
                email: 'maria.general@emprendeia.com',
                name: 'María López',
                avatar_url: 'IMG/placeholder-user.jpg',
                community: 'general',
                bio: 'Experta en negocios tradicionales y mentoría empresarial',
                created_at: new Date().toISOString(),
                last_sign_in: new Date().toISOString()
            },
            {
                id: 'mock_user_4',
                email: 'jose.general@emprendeia.com',
                name: 'José Martínez',
                avatar_url: 'IMG/placeholder-user.jpg',
                community: 'general',
                bio: 'Emprendedor en crecimiento, aprendiendo cada día',
                created_at: new Date().toISOString(),
                last_sign_in: new Date().toISOString()
            }
        ];
    }

    init() {
        // Verificar si hay un usuario guardado
        const savedUser = localStorage.getItem('mock_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.isAuthenticated = true;
            console.log('✅ Usuario simulado restaurado:', this.currentUser.name);
        }
    }

    // Simular login con Google
    async signInWithGoogle() {
        console.log('🎭 Simulando login con Google...');
        
        // Mostrar selector de usuario simulado
        const selectedUser = await this.mostrarSelectorUsuario();
        
        if (selectedUser) {
            this.currentUser = selectedUser;
            this.isAuthenticated = true;
            
            // Guardar en localStorage
            localStorage.setItem('mock_user', JSON.stringify(selectedUser));
            
            console.log('✅ Login simulado exitoso:', selectedUser.name);
            
            // Simular delay de red
            await this.simularDelay(1000);
            
            // Redirigir a la página de inicio después del login exitoso
            this.redirigirAPaginaInicio();
            
            return {
                data: { user: selectedUser },
                error: null
            };
        }
        
        return {
            data: null,
            error: { message: 'Login cancelado por el usuario' }
        };
    }

    // Mostrar selector de usuarios
    async mostrarSelectorUsuario() {
        return new Promise((resolve) => {
            // Crear modal
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            `;

            const modalContent = document.createElement('div');
            modalContent.style.cssText = `
                background: white;
                padding: 30px;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            `;

            modalContent.innerHTML = `
                <h2 style="text-align: center; color: #333; margin-bottom: 20px;">
                    🎭 Selecciona un Usuario de Prueba
                </h2>
                <p style="text-align: center; color: #666; margin-bottom: 25px;">
                    Simula el login con Google seleccionando un usuario de prueba
                </p>
                <div id="user-list" style="display: flex; flex-direction: column; gap: 10px;">
                    ${this.mockUsers.map(user => `
                        <div class="user-option" style="
                            padding: 15px;
                            border: 2px solid #e0e0e0;
                            border-radius: 10px;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            display: flex;
                            align-items: center;
                            gap: 15px;
                        " data-user-id="${user.id}">
                            <img src="${user.avatar_url}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
                            <div>
                                <div style="font-weight: bold; color: #333;">${user.name}</div>
                                <div style="color: #666; font-size: 14px;">${user.email}</div>
                                <div style="color: #888; font-size: 12px;">Comunidad: ${user.community}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <button id="cancel-btn" style="
                        background: #f44336;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        margin-right: 10px;
                    ">Cancelar</button>
                </div>
            `;

            modal.appendChild(modalContent);
            document.body.appendChild(modal);

            // Agregar eventos
            const userOptions = modalContent.querySelectorAll('.user-option');
            userOptions.forEach(option => {
                option.addEventListener('mouseenter', function() {
                    this.style.borderColor = '#4CAF50';
                    this.style.backgroundColor = '#f8f9fa';
                });
                
                option.addEventListener('mouseleave', function() {
                    this.style.borderColor = '#e0e0e0';
                    this.style.backgroundColor = 'white';
                });
                
                option.addEventListener('click', function() {
                    const userId = this.dataset.userId;
                    const selectedUser = this.mockUsers.find(u => u.id === userId);
                    document.body.removeChild(modal);
                    resolve(selectedUser);
                });
            });

            // Botón cancelar
            modalContent.querySelector('#cancel-btn').addEventListener('click', () => {
                document.body.removeChild(modal);
                resolve(null);
            });

            // Cerrar con ESC
            const handleEsc = (e) => {
                if (e.key === 'Escape') {
                    document.body.removeChild(modal);
                    document.removeEventListener('keydown', handleEsc);
                    resolve(null);
                }
            };
            document.addEventListener('keydown', handleEsc);
        });
    }

    // Simular logout
    async signOut() {
        console.log('🎭 Simulando logout...');
        
        this.currentUser = null;
        this.isAuthenticated = false;
        localStorage.removeItem('mock_user');
        
        await this.simularDelay(500);
        
        return { error: null };
    }

    // Obtener usuario actual
    getCurrentUser() {
        return this.currentUser;
    }

    // Verificar si está autenticado
    isSignedIn() {
        return this.isAuthenticated;
    }

    // Redirigir a la página de inicio
    redirigirAPaginaInicio() {
        console.log('🏠 Redirigiendo a la página de inicio...');
        
        // Determinar la URL de la página de inicio
        const paginaInicio = this.obtenerUrlPaginaInicio();
        
        // Mostrar mensaje de redirección
        this.mostrarMensajeRedireccion();
        
        // Redirigir después de un breve delay
        setTimeout(() => {
            window.location.href = paginaInicio;
        }, 1500);
    }

    // Obtener la URL de la página de inicio
    obtenerUrlPaginaInicio() {
        // Si estamos en una subcarpeta, ajustar la ruta
        const currentPath = window.location.pathname;
        
        if (currentPath.includes('/Usuario/') || currentPath.includes('/Cursos/')) {
            return '../prueba.html';
        } else if (currentPath.includes('/chatbot-main/')) {
            return '../../prueba.html';
        } else {
            return 'prueba.html';
        }
    }

    // Mostrar mensaje de redirección
    mostrarMensajeRedireccion() {
        // Crear overlay de redirección
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10001;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        `;

        const mensaje = document.createElement('div');
        mensaje.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            max-width: 400px;
        `;

        mensaje.innerHTML = `
            <div style="font-size: 48px; margin-bottom: 20px;">🏠</div>
            <h3 style="color: #333; margin-bottom: 15px;">¡Login Exitoso!</h3>
            <p style="color: #666; margin-bottom: 20px;">
                Serás redirigido a la página de inicio en unos segundos...
            </p>
            <div style="display: flex; justify-content: center;">
                <div class="spinner" style="
                    width: 30px;
                    height: 30px;
                    border: 3px solid #f3f3f3;
                    border-top: 3px solid #4CAF50;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                "></div>
            </div>
        `;

        // Agregar animación CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        overlay.appendChild(mensaje);
        document.body.appendChild(overlay);

        // Remover overlay después de la redirección
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
        }, 2000);
    }

    // Obtener usuarios de una comunidad específica
    getCommunityUsers(community) {
        return this.mockUsers.filter(user => user.community === community);
    }

    // Crear perfil de usuario simulado
    async createUserProfile(userId, profileData) {
        const user = this.mockUsers.find(u => u.id === userId);
        if (user) {
            const updatedUser = { ...user, ...profileData };
            this.mockUsers = this.mockUsers.map(u => u.id === userId ? updatedUser : u);
            return { data: updatedUser, error: null };
        }
        return { data: null, error: { message: 'Usuario no encontrado' } };
    }

    // Actualizar perfil de usuario
    async updateUserProfile(userId, profileData) {
        return this.createUserProfile(userId, profileData);
    }

    // Obtener perfil de usuario
    async getUserProfile(userId) {
        const user = this.mockUsers.find(u => u.id === userId);
        return { data: user, error: user ? null : { message: 'Usuario no encontrado' } };
    }
}

// Instancia global
window.mockGoogleAuth = new MockGoogleAuth();

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockGoogleAuth;
}
