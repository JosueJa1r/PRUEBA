// Sistema de Autenticación y Gestión de Usuarios para EmprendeIA
class UserAuth {
    constructor() {
        this.currentUser = null;
        this.userProfile = null;
        this.init();
    }

    init() {
        this.checkAuthState();
        this.setupEventListeners();
    }

    async checkAuthState() {
        try {
            const { data: { user } } = await window.supabaseConfig.supabase.auth.getUser();
            
            if (user) {
                this.currentUser = user;
                await this.loadUserProfile();
                this.updateUIForLoggedInUser();
            } else {
                this.updateUIForLoggedOutUser();
            }
        } catch (error) {
            console.error('Error verificando estado de autenticación:', error);
            this.updateUIForLoggedOutUser();
        }
    }

    async loadUserProfile() {
        if (!this.currentUser) return;

        try {
            const { data, error } = await window.supabaseConfig.getUserProfile(this.currentUser.id);
            
            if (error || !data) {
                // Crear perfil si no existe
                await this.createInitialProfile();
            } else {
                this.userProfile = data;
            }
        } catch (error) {
            console.error('Error cargando perfil de usuario:', error);
        }
    }

    async createInitialProfile() {
        const profileData = {
            name: this.currentUser.name || this.currentUser.email,
            email: this.currentUser.email,
            avatar_url: this.currentUser.avatar_url || 'IMG/placeholder-user.jpg',
            community: this.detectCommunity(),
            bio: '',
            skills: [],
            interests: [],
            location: '',
            website: '',
            linkedin: '',
            twitter: '',
            is_mentor: false,
            is_mentee: false,
            mentor_categories: [],
            mentee_goals: [],
            availability: 'available',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };

        try {
            const { data, error } = await window.supabaseConfig.createUserProfile(this.currentUser.id, profileData);
            
            if (!error && data) {
                this.userProfile = data;
                console.log('✅ Perfil de usuario creado exitosamente');
            }
        } catch (error) {
            console.error('Error creando perfil inicial:', error);
        }
    }

    detectCommunity() {
        const path = window.location.pathname;
        if (path.includes('creadoras')) return 'creadoras';
        if (path.includes('innovadores')) return 'innovadores';
        if (path.includes('legado')) return 'legado';
        return 'general';
    }

    async signInWithGoogle() {
        try {
            this.showLoadingState();
            
            const result = await window.supabaseConfig.signInWithGoogle();
            
            if (result.error) {
                throw result.error;
            }

            // En modo real, el usuario será redirigido
            // En modo mock, manejamos la respuesta
            if (result.data && result.data.user) {
                this.currentUser = result.data.user;
                await this.loadUserProfile();
                this.updateUIForLoggedInUser();
                this.showSuccessMessage('¡Bienvenido a EmprendeIA!');
            }
        } catch (error) {
            console.error('Error en autenticación:', error);
            this.showErrorMessage('Error al iniciar sesión. Inténtalo de nuevo.');
        } finally {
            this.hideLoadingState();
        }
    }

    async signOut() {
        try {
            await window.supabaseConfig.signOut();
            this.currentUser = null;
            this.userProfile = null;
            this.updateUIForLoggedOutUser();
            this.showSuccessMessage('Sesión cerrada exitosamente');
            
            // Redirigir a la página principal
            setTimeout(() => {
                window.location.href = 'prueba.html';
            }, 1500);
        } catch (error) {
            console.error('Error cerrando sesión:', error);
            this.showErrorMessage('Error al cerrar sesión');
        }
    }

    updateUIForLoggedInUser() {
        // Actualizar elementos de la interfaz para usuario logueado
        const loginButtons = document.querySelectorAll('.login-btn, .auth-btn');
        const userMenus = document.querySelectorAll('.user-menu');
        const userAvatars = document.querySelectorAll('.user-avatar');
        const userNameElements = document.querySelectorAll('.user-name');

        loginButtons.forEach(btn => {
            btn.style.display = 'none';
        });

        userMenus.forEach(menu => {
            menu.style.display = 'block';
        });

        if (this.userProfile) {
            userAvatars.forEach(avatar => {
                avatar.src = this.userProfile.avatar_url;
                avatar.alt = this.userProfile.name;
            });

            userNameElements.forEach(nameEl => {
                nameEl.textContent = this.userProfile.name;
            });
        }

        // Actualizar foros con usuario real
        this.updateForumWithRealUser();
    }

    updateUIForLoggedOutUser() {
        // Actualizar elementos de la interfaz para usuario no logueado
        const loginButtons = document.querySelectorAll('.login-btn, .auth-btn');
        const userMenus = document.querySelectorAll('.user-menu');

        loginButtons.forEach(btn => {
            btn.style.display = 'block';
        });

        userMenus.forEach(menu => {
            menu.style.display = 'none';
        });
    }

    updateForumWithRealUser() {
        // Actualizar el sistema de foros para usar el usuario real
        if (window.forumInteractions && this.userProfile) {
            window.forumInteractions.currentUser = {
                id: this.currentUser.id,
                name: this.userProfile.name,
                avatar: this.userProfile.avatar_url,
                community: this.userProfile.community
            };
            
            // Re-renderizar el foro con el usuario real
            window.forumInteractions.renderForumPosts();
        }
    }

    setupEventListeners() {
        // Event listeners para botones de autenticación
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('google-signin-btn')) {
                e.preventDefault();
                this.signInWithGoogle();
            } else if (e.target.classList.contains('signout-btn')) {
                e.preventDefault();
                this.signOut();
            } else if (e.target.classList.contains('profile-btn')) {
                e.preventDefault();
                this.showUserProfile();
            }
        });
    }

    showUserProfile() {
        if (!this.userProfile) return;

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content user-profile-modal">
                <div class="modal-header">
                    <h3>Mi Perfil</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="profile-header">
                        <img src="${this.userProfile.avatar_url}" alt="${this.userProfile.name}" class="profile-avatar">
                        <div class="profile-info">
                            <h2>${this.userProfile.name}</h2>
                            <p class="profile-email">${this.userProfile.email}</p>
                            <span class="profile-community">${this.getCommunityDisplayName(this.userProfile.community)}</span>
                        </div>
                    </div>
                    
                    <div class="profile-details">
                        <div class="form-group">
                            <label>Biografía</label>
                            <textarea id="profile-bio" placeholder="Cuéntanos sobre ti...">${this.userProfile.bio || ''}</textarea>
                        </div>
                        
                        <div class="form-group">
                            <label>Ubicación</label>
                            <input type="text" id="profile-location" placeholder="Ciudad, País" value="${this.userProfile.location || ''}">
                        </div>
                        
                        <div class="form-group">
                            <label>Sitio Web</label>
                            <input type="url" id="profile-website" placeholder="https://tu-sitio.com" value="${this.userProfile.website || ''}">
                        </div>
                        
                        <div class="form-group">
                            <label>LinkedIn</label>
                            <input type="url" id="profile-linkedin" placeholder="https://linkedin.com/in/tu-perfil" value="${this.userProfile.linkedin || ''}">
                        </div>
                        
                        <div class="form-group">
                            <label>Habilidades (separadas por comas)</label>
                            <input type="text" id="profile-skills" placeholder="Marketing, Ventas, Desarrollo..." value="${this.userProfile.skills ? this.userProfile.skills.join(', ') : ''}">
                        </div>
                        
                        <div class="form-group">
                            <label>Intereses (separados por comas)</label>
                            <input type="text" id="profile-interests" placeholder="Startups, IA, Fintech..." value="${this.userProfile.interests ? this.userProfile.interests.join(', ') : ''}">
                        </div>
                        
                        <div class="form-group">
                            <label>Disponibilidad</label>
                            <select id="profile-availability">
                                <option value="available" ${this.userProfile.availability === 'available' ? 'selected' : ''}>Disponible</option>
                                <option value="busy" ${this.userProfile.availability === 'busy' ? 'selected' : ''}>Ocupado</option>
                                <option value="away" ${this.userProfile.availability === 'away' ? 'selected' : ''}>Ausente</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="userAuth.closeProfileModal()">Cancelar</button>
                    <button class="btn btn-primary" onclick="userAuth.saveProfile()">Guardar Cambios</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Event listener para cerrar modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            this.closeProfileModal();
        });
    }

    async saveProfile() {
        try {
            const updatedProfile = {
                bio: document.getElementById('profile-bio').value,
                location: document.getElementById('profile-location').value,
                website: document.getElementById('profile-website').value,
                linkedin: document.getElementById('profile-linkedin').value,
                skills: document.getElementById('profile-skills').value.split(',').map(s => s.trim()).filter(s => s),
                interests: document.getElementById('profile-interests').value.split(',').map(s => s.trim()).filter(s => s),
                availability: document.getElementById('profile-availability').value,
                updated_at: new Date().toISOString()
            };

            const { data, error } = await window.supabaseConfig.updateUserProfile(this.currentUser.id, updatedProfile);
            
            if (!error && data) {
                this.userProfile = { ...this.userProfile, ...data };
                this.closeProfileModal();
                this.showSuccessMessage('Perfil actualizado exitosamente');
            } else {
                throw error;
            }
        } catch (error) {
            console.error('Error guardando perfil:', error);
            this.showErrorMessage('Error al guardar el perfil');
        }
    }

    closeProfileModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
    }

    getCommunityDisplayName(community) {
        const names = {
            'creadoras': 'Creadoras del Futuro',
            'innovadores': 'Innovadores del Futuro',
            'legado': 'Legado Emprendedor',
            'general': 'Comunidad General'
        };
        return names[community] || 'Comunidad General';
    }

    showLoadingState() {
        const loadingEl = document.createElement('div');
        loadingEl.className = 'loading-overlay';
        loadingEl.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Iniciando sesión...</p>
            </div>
        `;
        document.body.appendChild(loadingEl);
    }

    hideLoadingState() {
        const loadingEl = document.querySelector('.loading-overlay');
        if (loadingEl) {
            loadingEl.remove();
        }
    }

    showSuccessMessage(message) {
        this.showNotification(message, 'success');
    }

    showErrorMessage(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 16px rgba(0,0,0,0.2);
            font-weight: 600;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // Métodos públicos para acceso desde otros scripts
    getCurrentUser() {
        return this.currentUser;
    }

    getUserProfile() {
        return this.userProfile;
    }

    isLoggedIn() {
        return !!this.currentUser;
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.userAuth = new UserAuth();
});
