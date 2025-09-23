// Directorio de Usuarios para EmprendeIA
class UserDirectory {
    constructor() {
        this.users = [];
        this.filteredUsers = [];
        this.currentFilter = 'all';
        this.currentSearch = '';
        this.init();
    }

    init() {
        this.loadUsers();
        this.setupEventListeners();
    }

    async loadUsers() {
        try {
            const community = this.getCurrentCommunity();
            const { data, error } = await window.supabaseConfig.getCommunityUsers(community);
            
            if (!error && data) {
                this.users = data;
                this.filteredUsers = [...this.users];
                this.renderUsers();
            } else {
                console.error('Error cargando usuarios:', error);
                this.loadMockUsers();
            }
        } catch (error) {
            console.error('Error cargando usuarios:', error);
            this.loadMockUsers();
        }
    }

    loadMockUsers() {
        // Usuarios de ejemplo para desarrollo
        this.users = [
            {
                id: 'user_1',
                name: 'María González',
                email: 'maria@emprendeia.com',
                avatar_url: 'IMG/Janeth.png',
                bio: 'Emprendedora en tecnología sostenible. Especialista en fintech verde.',
                community: 'creadoras',
                skills: ['Fintech', 'Sostenibilidad', 'Marketing Digital'],
                interests: ['Startups', 'Impacto Social', 'Tecnología Verde'],
                location: 'Madrid, España',
                website: 'https://maria-green-tech.com',
                linkedin: 'https://linkedin.com/in/mariagonzalez',
                availability: 'available',
                created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'user_2',
                name: 'Ana Rodríguez',
                email: 'ana@emprendeia.com',
                avatar_url: 'IMG/elena.png',
                bio: 'Consultora en estrategia digital y mentor de startups.',
                community: 'creadoras',
                skills: ['Estrategia Digital', 'Consultoría', 'Mentoring'],
                interests: ['Startups', 'Digitalización', 'Liderazgo'],
                location: 'Barcelona, España',
                website: 'https://ana-digital-strategy.com',
                linkedin: 'https://linkedin.com/in/anarodriguez',
                availability: 'available',
                created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'user_3',
                name: 'Alex Chen',
                email: 'alex@emprendeia.com',
                avatar_url: 'IMG/placeholder-user.jpg',
                bio: 'Desarrollador full-stack especializado en IA y machine learning.',
                community: 'innovadores',
                skills: ['Desarrollo Full-Stack', 'IA', 'Machine Learning', 'Python'],
                interests: ['IA', 'Tecnología', 'Innovación', 'Startups'],
                location: 'Valencia, España',
                website: 'https://alex-chen-dev.com',
                linkedin: 'https://linkedin.com/in/alexchen',
                availability: 'busy',
                created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'user_4',
                name: 'Diego López',
                email: 'diego@emprendeia.com',
                avatar_url: 'IMG/placeholder-user.jpg',
                bio: 'Emprendedor serial y mentor de jóvenes innovadores.',
                community: 'innovadores',
                skills: ['Emprendimiento', 'Ventas', 'Mentoring', 'Networking'],
                interests: ['Startups', 'Innovación', 'Tecnología', 'Mentoring'],
                location: 'Sevilla, España',
                website: 'https://diego-entrepreneur.com',
                linkedin: 'https://linkedin.com/in/diegolopez',
                availability: 'available',
                created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'user_5',
                name: 'Roberto Mendoza',
                email: 'roberto@emprendeia.com',
                avatar_url: 'IMG/placeholder-user.jpg',
                bio: 'Ejecutivo con 20 años de experiencia, ahora emprendedor.',
                community: 'legado',
                skills: ['Liderazgo', 'Estrategia', 'Finanzas', 'Gestión'],
                interests: ['Transición Profesional', 'Inversión', 'Mentoring'],
                location: 'Madrid, España',
                website: 'https://roberto-mendoza.com',
                linkedin: 'https://linkedin.com/in/robertomendoza',
                availability: 'available',
                created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'user_6',
                name: 'Elena Vargas',
                email: 'elena@emprendeia.com',
                avatar_url: 'IMG/placeholder-user.jpg',
                bio: 'Experta en transición de carrera y desarrollo profesional.',
                community: 'legado',
                skills: ['Desarrollo Profesional', 'Transición de Carrera', 'Coaching'],
                interests: ['Desarrollo Profesional', 'Mentoring', 'Liderazgo'],
                location: 'Bilbao, España',
                website: 'https://elena-career-coach.com',
                linkedin: 'https://linkedin.com/in/elenavargas',
                availability: 'available',
                created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
            }
        ];

        this.filteredUsers = [...this.users];
        this.renderUsers();
    }

    getCurrentCommunity() {
        const path = window.location.pathname;
        if (path.includes('creadoras')) return 'creadoras';
        if (path.includes('innovadores')) return 'innovadores';
        if (path.includes('legado')) return 'legado';
        return 'general';
    }

    renderUsers() {
        const container = document.getElementById('user-directory');
        if (!container) return;

        container.innerHTML = this.createDirectoryHTML();
    }

    createDirectoryHTML() {
        const statsHTML = this.createStatsHTML();
        const filtersHTML = this.createFiltersHTML();
        const usersHTML = this.createUsersHTML();

        return `
            <div class="directory-header">
                <div class="directory-title">
                    <h2>👥 Directorio de Miembros</h2>
                    <p>Conecta con otros emprendedores de tu comunidad</p>
                </div>
                ${statsHTML}
            </div>
            
            <div class="directory-filters">
                ${filtersHTML}
            </div>
            
            <div class="users-grid">
                ${usersHTML}
            </div>
        `;
    }

    createStatsHTML() {
        const totalUsers = this.users.length;
        const availableUsers = this.users.filter(u => u.availability === 'available').length;
        const mentors = this.users.filter(u => u.skills && u.skills.length > 3).length;

        return `
            <div class="directory-stats">
                <div class="stat-card">
                    <i class="fas fa-users"></i>
                    <span class="stat-number">${totalUsers}</span>
                    <span class="stat-label">Miembros</span>
                </div>
                <div class="stat-card">
                    <i class="fas fa-circle" style="color: #10b981;"></i>
                    <span class="stat-number">${availableUsers}</span>
                    <span class="stat-label">Disponibles</span>
                </div>
                <div class="stat-card">
                    <i class="fas fa-chalkboard-teacher"></i>
                    <span class="stat-number">${mentors}</span>
                    <span class="stat-label">Mentores</span>
                </div>
            </div>
        `;
    }

    createFiltersHTML() {
        return `
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" id="user-search" placeholder="Buscar por nombre, habilidades o ubicación...">
            </div>
            
            <div class="filter-buttons">
                <button class="filter-btn ${this.currentFilter === 'all' ? 'active' : ''}" data-filter="all">
                    <i class="fas fa-users"></i>
                    Todos
                </button>
                <button class="filter-btn ${this.currentFilter === 'available' ? 'active' : ''}" data-filter="available">
                    <i class="fas fa-circle" style="color: #10b981;"></i>
                    Disponibles
                </button>
                <button class="filter-btn ${this.currentFilter === 'mentors' ? 'active' : ''}" data-filter="mentors">
                    <i class="fas fa-chalkboard-teacher"></i>
                    Mentores
                </button>
                <button class="filter-btn ${this.currentFilter === 'new' ? 'active' : ''}" data-filter="new">
                    <i class="fas fa-star"></i>
                    Nuevos
                </button>
            </div>
        `;
    }

    createUsersHTML() {
        if (this.filteredUsers.length === 0) {
            return `
                <div class="no-users">
                    <i class="fas fa-search"></i>
                    <h3>No se encontraron usuarios</h3>
                    <p>Intenta ajustar tus filtros de búsqueda</p>
                </div>
            `;
        }

        return this.filteredUsers.map(user => this.createUserCard(user)).join('');
    }

    createUserCard(user) {
        const skillsHTML = user.skills ? user.skills.slice(0, 3).map(skill => 
            `<span class="skill-tag">${skill}</span>`
        ).join('') : '';
        
        const availabilityClass = user.availability === 'available' ? 'available' : 
                                 user.availability === 'busy' ? 'busy' : 'away';
        
        const availabilityText = user.availability === 'available' ? 'Disponible' :
                                user.availability === 'busy' ? 'Ocupado' : 'Ausente';

        return `
            <div class="user-card" data-user-id="${user.id}">
                <div class="user-card-header">
                    <img src="${user.avatar_url}" alt="${user.name}" class="user-card-avatar">
                    <div class="user-card-info">
                        <h3 class="user-card-name">${user.name}</h3>
                        <p class="user-card-location">
                            <i class="fas fa-map-marker-alt"></i>
                            ${user.location || 'Ubicación no especificada'}
                        </p>
                        <div class="user-card-status">
                            <span class="status-indicator ${availabilityClass}"></span>
                            <span class="status-text">${availabilityText}</span>
                        </div>
                    </div>
                </div>
                
                <div class="user-card-body">
                    <p class="user-card-bio">${user.bio || 'Sin biografía disponible'}</p>
                    
                    <div class="user-card-skills">
                        ${skillsHTML}
                        ${user.skills && user.skills.length > 3 ? `<span class="more-skills">+${user.skills.length - 3} más</span>` : ''}
                    </div>
                </div>
                
                <div class="user-card-footer">
                    <button class="btn btn-outline connect-btn" data-user-id="${user.id}">
                        <i class="fas fa-handshake"></i>
                        Conectar
                    </button>
                    <button class="btn btn-primary message-btn" data-user-id="${user.id}">
                        <i class="fas fa-envelope"></i>
                        Mensaje
                    </button>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                this.filterUsers(e.target.dataset.filter);
            } else if (e.target.classList.contains('connect-btn')) {
                this.connectWithUser(e.target.dataset.userId);
            } else if (e.target.classList.contains('message-btn')) {
                this.messageUser(e.target.dataset.userId);
            }
        });

        document.addEventListener('input', (e) => {
            if (e.target.id === 'user-search') {
                this.searchUsers(e.target.value);
            }
        });
    }

    filterUsers(filter) {
        this.currentFilter = filter;
        
        // Actualizar botones de filtro
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

        // Aplicar filtro
        let filtered = [...this.users];

        switch (filter) {
            case 'available':
                filtered = filtered.filter(user => user.availability === 'available');
                break;
            case 'mentors':
                filtered = filtered.filter(user => user.skills && user.skills.length > 3);
                break;
            case 'new':
                const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                filtered = filtered.filter(user => new Date(user.created_at) > oneWeekAgo);
                break;
        }

        // Aplicar búsqueda si existe
        if (this.currentSearch) {
            filtered = this.applySearch(filtered, this.currentSearch);
        }

        this.filteredUsers = filtered;
        this.renderUsers();
    }

    searchUsers(query) {
        this.currentSearch = query.toLowerCase();
        
        let filtered = [...this.users];

        // Aplicar filtro actual
        if (this.currentFilter !== 'all') {
            filtered = this.applyFilter(filtered, this.currentFilter);
        }

        // Aplicar búsqueda
        if (this.currentSearch) {
            filtered = this.applySearch(filtered, this.currentSearch);
        }

        this.filteredUsers = filtered;
        this.renderUsers();
    }

    applyFilter(users, filter) {
        switch (filter) {
            case 'available':
                return users.filter(user => user.availability === 'available');
            case 'mentors':
                return users.filter(user => user.skills && user.skills.length > 3);
            case 'new':
                const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                return users.filter(user => new Date(user.created_at) > oneWeekAgo);
            default:
                return users;
        }
    }

    applySearch(users, query) {
        return users.filter(user => 
            user.name.toLowerCase().includes(query) ||
            user.bio?.toLowerCase().includes(query) ||
            user.location?.toLowerCase().includes(query) ||
            user.skills?.some(skill => skill.toLowerCase().includes(query)) ||
            user.interests?.some(interest => interest.toLowerCase().includes(query))
        );
    }

    async connectWithUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        if (!window.userAuth.isLoggedIn()) {
            this.showMessage('Debes iniciar sesión para conectar con otros usuarios', 'warning');
            return;
        }

        try {
            // Aquí implementarías la lógica de conexión real
            this.showMessage(`Solicitud de conexión enviada a ${user.name}`, 'success');
        } catch (error) {
            console.error('Error enviando solicitud de conexión:', error);
            this.showMessage('Error al enviar solicitud de conexión', 'error');
        }
    }

    async messageUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        if (!window.userAuth.isLoggedIn()) {
            this.showMessage('Debes iniciar sesión para enviar mensajes', 'warning');
            return;
        }

        // Abrir modal de mensaje
        this.showMessageModal(user);
    }

    showMessageModal(user) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content message-modal">
                <div class="modal-header">
                    <h3>Enviar Mensaje a ${user.name}</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="message-recipient">
                        <img src="${user.avatar_url}" alt="${user.name}" class="recipient-avatar">
                        <div class="recipient-info">
                            <h4>${user.name}</h4>
                            <p>${user.location || 'Ubicación no especificada'}</p>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Asunto</label>
                        <input type="text" id="message-subject" placeholder="Asunto del mensaje">
                    </div>
                    
                    <div class="form-group">
                        <label>Mensaje</label>
                        <textarea id="message-content" placeholder="Escribe tu mensaje aquí..." rows="6"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="userDirectory.closeMessageModal()">Cancelar</button>
                    <button class="btn btn-primary" onclick="userDirectory.sendMessage('${user.id}')">Enviar Mensaje</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Event listener para cerrar modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            this.closeMessageModal();
        });
    }

    async sendMessage(userId) {
        const subject = document.getElementById('message-subject').value.trim();
        const content = document.getElementById('message-content').value.trim();

        if (!subject || !content) {
            this.showMessage('Completa todos los campos', 'warning');
            return;
        }

        try {
            // Aquí implementarías el envío real del mensaje
            this.closeMessageModal();
            this.showMessage('Mensaje enviado exitosamente', 'success');
        } catch (error) {
            console.error('Error enviando mensaje:', error);
            this.showMessage('Error al enviar mensaje', 'error');
        }
    }

    closeMessageModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
    }

    showMessage(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
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
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('user-directory')) {
        window.userDirectory = new UserDirectory();
    }
});
