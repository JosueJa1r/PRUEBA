// Sistema Avanzado de Interacciones Sociales para Foros de Comunidades
class ForumInteractions {
    constructor() {
        this.currentUser = this.getCurrentUser();
        this.forumData = this.loadForumData();
        this.categories = this.getCategories();
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderForumPosts();
    }

    getCurrentUser() {
        // Obtener usuario actual con foto personalizada
        const savedPhoto = localStorage.getItem('userPhoto');
        const userName = localStorage.getItem('userName') || 'Usuario EmprendeIA';
        const userEmail = localStorage.getItem('userEmail') || 'usuario@emprendeia.com';
        
        return {
            id: 'user_' + Date.now(),
            name: userName,
            email: userEmail,
            avatar: savedPhoto || 'IMG/placeholder-user.jpg',
            community: this.getCommunityFromURL()
        };
    }

    getCommunityFromURL() {
        const path = window.location.pathname;
        if (path.includes('creadoras')) return 'creadoras';
        if (path.includes('innovadores')) return 'innovadores';
        return 'general';
    }

    getCategories() {
        const community = this.currentUser.community;
        const baseCategories = {
            creadoras: [
                { id: 'general', name: '💬 General', icon: 'fas fa-comments' },
                { id: 'startups', name: '🚀 Startups', icon: 'fas fa-rocket' },
                { id: 'finanzas', name: '💰 Finanzas', icon: 'fas fa-dollar-sign' },
                { id: 'networking', name: '🤝 Networking', icon: 'fas fa-handshake' },
                { id: 'mentoring', name: '👩‍🏫 Mentoring', icon: 'fas fa-chalkboard-teacher' }
            ],
            innovadores: [
                { id: 'general', name: '💬 General', icon: 'fas fa-comments' },
                { id: 'tech', name: '💻 Tecnología', icon: 'fas fa-laptop-code' },
                { id: 'ai', name: '🤖 IA & Machine Learning', icon: 'fas fa-robot' },
                { id: 'startups', name: '🚀 Startups', icon: 'fas fa-rocket' },
                { id: 'colaboracion', name: '🤝 Colaboración', icon: 'fas fa-users' }
            ],
                { id: 'experiencia', name: '🎯 Experiencia', icon: 'fas fa-trophy' },
                { id: 'transicion', name: '🔄 Transición', icon: 'fas fa-exchange-alt' },
                { id: 'inversion', name: '💼 Inversión', icon: 'fas fa-chart-line' },
                { id: 'mentoring', name: '👨‍🏫 Mentoring', icon: 'fas fa-chalkboard-teacher' }
            ]
        };
        return baseCategories[community] || baseCategories.creadoras;
    }

    loadForumData() {
        const saved = localStorage.getItem('forumData_' + this.currentUser.community);
        if (saved) {
            return JSON.parse(saved);
        }
        return this.getDefaultForumData();
    }

    getDefaultForumData() {
        const community = this.currentUser.community;
        const basePosts = {
            creadoras: [
                {
                    id: 'post_1',
                    title: '🚀 Mi nueva startup de tecnología sostenible',
                    content: 'Hola chicas! Estoy desarrollando una plataforma que conecta a mujeres emprendedoras con inversores de impacto. ¿Alguien tiene experiencia en este sector?',
                    author: 'María González',
                    avatar: 'IMG/Janeth.png',
                    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
                    likes: 15,
                    comments: 8,
                    liked: false,
                    commentsList: [
                        {
                            id: 'comment_1',
                            author: 'Ana Rodríguez',
                            avatar: 'IMG/elena.png',
                            content: '¡Excelente idea! Yo trabajé en fintech sostenible. Te puedo conectar con algunos contactos.',
                            timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
                            likes: 3,
                            liked: false
                        },
                        {
                            id: 'comment_2',
                            author: 'Carmen López',
                            avatar: 'IMG/placeholder-user.jpg',
                            content: 'Me encanta el enfoque! ¿Ya tienes un MVP?',
                            timestamp: new Date(Date.now() - 30 * 60 * 1000),
                            likes: 1,
                            liked: false
                        }
                    ]
                },
                {
                    id: 'post_2',
                    title: '💡 ¿Cómo validar una idea de negocio sin inversión inicial?',
                    content: 'Estoy en la fase inicial de mi emprendimiento y necesito consejos sobre validación de mercado sin gastar mucho dinero.',
                    author: 'Ana Rodríguez',
                    avatar: 'IMG/elena.png',
                    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
                    likes: 12,
                    comments: 6,
                    liked: true,
                    commentsList: [
                        {
                            id: 'comment_3',
                            author: 'Sofia Martínez',
                            avatar: 'IMG/placeholder-user.jpg',
                            content: 'Te recomiendo empezar con entrevistas a clientes potenciales. Es gratis y muy efectivo.',
                            timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
                            likes: 5,
                            liked: false
                        }
                    ]
                }
            ],
            innovadores: [
                {
                    id: 'post_3',
                    title: '🚀 Mi startup de IA para educación personalizada',
                    content: 'Desarrollando una plataforma que usa IA para crear planes de estudio personalizados. ¿Alguien quiere colaborar?',
                    author: 'Alex Chen',
                    avatar: 'IMG/placeholder-user.jpg',
                    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
                    likes: 23,
                    comments: 12,
                    liked: false,
                    commentsList: [
                        {
                            id: 'comment_4',
                            author: 'Diego López',
                            avatar: 'IMG/placeholder-user.jpg',
                            content: '¡Increíble! Yo soy desarrollador full-stack. ¿Necesitas ayuda técnica?',
                            timestamp: new Date(Date.now() - 45 * 60 * 1000),
                            likes: 8,
                            liked: true
                        }
                    ]
                },
                {
                    id: 'post_4',
                    title: '💡 ¿Cómo validar una idea tech sin código?',
                    content: 'Tengo una idea para una app pero no sé programar. ¿Cuáles son las mejores herramientas no-code?',
                    author: 'Sofia Martínez',
                    avatar: 'IMG/placeholder-user.jpg',
                    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
                    likes: 15,
                    comments: 9,
                    liked: false,
                    commentsList: []
                }
            ],
                    id: 'post_5',
                    title: '🏢 Mi transición de ejecutivo a emprendedor',
                    content: 'Después de 20 años en corporaciones, decidí emprender. Comparto mi experiencia y busco consejos de otros que hayan hecho esta transición.',
                    author: 'Roberto Mendoza',
                    avatar: 'IMG/placeholder-user.jpg',
                    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                    likes: 18,
                    comments: 11,
                    liked: false,
                    commentsList: [
                        {
                            id: 'comment_5',
                            author: 'Elena Vargas',
                            avatar: 'IMG/placeholder-user.jpg',
                            content: 'Excelente decisión! Yo hice la transición hace 5 años. La clave está en aprovechar tu red profesional.',
                            timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
                            likes: 6,
                            liked: false
                        }
                    ]
                },
                {
                    id: 'post_6',
                    title: '💡 ¿Cómo adaptar mi experiencia a la era digital?',
                    content: 'Tengo décadas de experiencia en ventas tradicionales, pero necesito adaptarme al mundo digital. ¿Por dónde empiezo?',
                    author: 'Carmen Ruiz',
                    avatar: 'IMG/placeholder-user.jpg',
                    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
                    likes: 12,
                    comments: 7,
                    liked: true,
                    commentsList: []
                }
            ]
        };

        return basePosts[community] || [];
    }

    bindEvents() {
        // Event delegation para manejar clicks en elementos dinámicos
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('like-btn')) {
                this.toggleLike(e.target.dataset.postId);
            } else if (e.target.classList.contains('comment-btn')) {
                this.toggleComments(e.target.dataset.postId);
            } else if (e.target.classList.contains('add-comment-btn')) {
                this.addComment(e.target.dataset.postId);
            } else if (e.target.classList.contains('like-comment-btn')) {
                this.toggleCommentLike(e.target.dataset.commentId, e.target.dataset.postId);
            } else if (e.target.classList.contains('new-post-btn')) {
                this.showNewPostModal();
            } else if (e.target.classList.contains('bookmark-btn')) {
                this.toggleBookmark(e.target.dataset.postId);
            } else if (e.target.classList.contains('share-btn')) {
                this.sharePost(e.target.dataset.postId);
            } else if (e.target.classList.contains('category-btn')) {
                this.filterByCategory(e.target.dataset.category);
            }
        });

        // Event listener para el modal de nuevo post
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.hideNewPostModal();
            }
        });

        // Event listener para búsqueda
        document.addEventListener('input', (e) => {
            if (e.target.id === 'search-posts') {
                this.searchPosts(e.target.value);
            }
        });
    }

    renderForumPosts() {
        const forumContainer = document.getElementById('forum-posts');
        if (!forumContainer) return;

        // Crear header del foro con categorías y filtros
        const forumHeader = this.createForumHeader();
        forumContainer.innerHTML = forumHeader;

        // Renderizar posts
        const postsContainer = document.createElement('div');
        postsContainer.className = 'posts-container';
        postsContainer.innerHTML = this.forumData.map(post => this.createPostHTML(post)).join('');
        forumContainer.appendChild(postsContainer);

        // Agregar botón para nuevo post
        const newPostBtn = document.createElement('div');
        newPostBtn.className = 'new-post-section';
        newPostBtn.innerHTML = `
            <button class="new-post-btn">
                <i class="fas fa-plus"></i>
                Crear Nuevo Post
            </button>
        `;
        forumContainer.appendChild(newPostBtn);
    }

    createForumHeader() {
        const categoriesHTML = this.categories.map(category => 
            `<button class="category-btn" data-category="${category.id}">
                <i class="${category.icon}"></i>
                ${category.name}
            </button>`
        ).join('');

        return `
            <div class="forum-header">
                <div class="forum-stats">
                    <div class="stat-item">
                        <i class="fas fa-comments"></i>
                        <span>${this.forumData.length} Posts</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-users"></i>
                        <span>${this.getActiveUsers()} Miembros Activos</span>
                    </div>
                </div>
                
                <div class="forum-filters">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" id="search-posts" placeholder="Buscar posts...">
                    </div>
                    
                    <div class="category-filters">
                        ${categoriesHTML}
                    </div>
                </div>
            </div>
        `;
    }

    getActiveUsers() {
        // Simular usuarios activos basado en posts
        const uniqueUsers = new Set(this.forumData.map(post => post.author));
        return uniqueUsers.size + Math.floor(Math.random() * 50) + 20; // Simular más usuarios
    }

    createPostHTML(post) {
        const timeAgo = this.getTimeAgo(post.timestamp);
        const commentsHTML = post.commentsList.map(comment => this.createCommentHTML(comment, post.id)).join('');
        const category = this.categories.find(cat => cat.id === (post.category || 'general'));
        
        return `
            <div class="forum-post" data-post-id="${post.id}" data-category="${post.category || 'general'}">
                <div class="post-header">
                    <img src="${post.avatar}" alt="${post.author}" class="post-avatar">
                    <div class="post-author-info">
                        <h4 class="post-author">${post.author}</h4>
                        <span class="post-time">${timeAgo}</span>
                        ${post.category ? `<span class="post-category">${category.icon} ${category.name}</span>` : ''}
                    </div>
                    <div class="post-menu">
                        <button class="menu-btn">
                            <i class="fas fa-ellipsis-h"></i>
                        </button>
                    </div>
                </div>
                
                <div class="post-content">
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-text">${post.content}</p>
                    ${post.tags ? `<div class="post-tags">${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}</div>` : ''}
                </div>
                
                <div class="post-actions">
                    <button class="action-btn like-btn ${post.liked ? 'liked' : ''}" data-post-id="${post.id}">
                        <i class="fas fa-heart"></i>
                        <span class="like-count">${post.likes}</span>
                    </button>
                    
                    <button class="action-btn comment-btn" data-post-id="${post.id}">
                        <i class="fas fa-comment"></i>
                        <span class="comment-count">${post.comments}</span>
                    </button>
                    
                    <button class="action-btn bookmark-btn ${post.bookmarked ? 'bookmarked' : ''}" data-post-id="${post.id}">
                        <i class="fas fa-bookmark"></i>
                        Guardar
                    </button>
                    
                    <button class="action-btn share-btn" data-post-id="${post.id}">
                        <i class="fas fa-share"></i>
                        Compartir
                    </button>
                </div>
                
                <div class="post-comments" id="comments-${post.id}" style="display: none;">
                    <div class="comments-list">
                        ${commentsHTML}
                    </div>
                    
                    <div class="add-comment-section">
                        <img src="${this.currentUser.avatar}" alt="${this.currentUser.name}" class="comment-avatar">
                        <div class="comment-input-container">
                            <textarea class="comment-input" placeholder="Escribe tu comentario..." data-post-id="${post.id}"></textarea>
                            <button class="add-comment-btn" data-post-id="${post.id}">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createCommentHTML(comment, postId) {
        const timeAgo = this.getTimeAgo(comment.timestamp);
        
        return `
            <div class="comment-item">
                <img src="${comment.avatar}" alt="${comment.author}" class="comment-avatar">
                <div class="comment-content">
                    <div class="comment-header">
                        <span class="comment-author">${comment.author}</span>
                        <span class="comment-time">${timeAgo}</span>
                    </div>
                    <p class="comment-text">${comment.content}</p>
                    <button class="like-comment-btn ${comment.liked ? 'liked' : ''}" data-comment-id="${comment.id}" data-post-id="${postId}">
                        <i class="fas fa-heart"></i>
                        <span>${comment.likes}</span>
                    </button>
                </div>
            </div>
        `;
    }

    toggleLike(postId) {
        const post = this.forumData.find(p => p.id === postId);
        if (!post) return;

        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;

        this.saveForumData();
        this.renderForumPosts();
        this.showNotification(post.liked ? '❤️ Post liked!' : '💔 Like removed');
    }

    toggleCommentLike(commentId, postId) {
        const post = this.forumData.find(p => p.id === postId);
        if (!post) return;

        const comment = post.commentsList.find(c => c.id === commentId);
        if (!comment) return;

        comment.liked = !comment.liked;
        comment.likes += comment.liked ? 1 : -1;

        this.saveForumData();
        this.renderForumPosts();
    }

    toggleComments(postId) {
        const commentsSection = document.getElementById(`comments-${postId}`);
        if (!commentsSection) return;

        const isVisible = commentsSection.style.display !== 'none';
        commentsSection.style.display = isVisible ? 'none' : 'block';
        
        if (!isVisible) {
            commentsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    addComment(postId) {
        const post = this.forumData.find(p => p.id === postId);
        if (!post) return;

        const commentInput = document.querySelector(`textarea[data-post-id="${postId}"]`);
        const content = commentInput.value.trim();
        
        if (!content) {
            this.showNotification('⚠️ Escribe un comentario antes de enviar');
            return;
        }

        const newComment = {
            id: 'comment_' + Date.now(),
            author: this.currentUser.name,
            avatar: this.currentUser.avatar,
            content: content,
            timestamp: new Date(),
            likes: 0,
            liked: false
        };

        post.commentsList.push(newComment);
        post.comments += 1;

        commentInput.value = '';
        this.saveForumData();
        this.renderForumPosts();
        this.showNotification('💬 Comentario agregado!');
    }

    showNewPostModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        
        const categoriesHTML = this.categories.map(category => 
            `<option value="${category.id}">${category.icon} ${category.name}</option>`
        ).join('');

        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Crear Nuevo Post</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Categoría</label>
                        <select id="post-category">
                            ${categoriesHTML}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Título del Post</label>
                        <input type="text" id="post-title" placeholder="Escribe un título atractivo...">
                    </div>
                    <div class="form-group">
                        <label>Contenido</label>
                        <textarea id="post-content" placeholder="Comparte tu idea, pregunta o experiencia..."></textarea>
                    </div>
                    <div class="form-group">
                        <label>Tags (opcional)</label>
                        <input type="text" id="post-tags" placeholder="startup, fintech, innovación (separados por comas)">
                        <small>Los tags ayudan a otros miembros a encontrar tu post</small>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="forumInteractions.hideNewPostModal()">Cancelar</button>
                    <button class="btn btn-primary" onclick="forumInteractions.createNewPost()">Publicar</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Event listener para cerrar modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            this.hideNewPostModal();
        });
    }

    hideNewPostModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
    }

    createNewPost() {
        const category = document.getElementById('post-category').value;
        const title = document.getElementById('post-title').value.trim();
        const content = document.getElementById('post-content').value.trim();
        const tagsInput = document.getElementById('post-tags').value.trim();

        if (!title || !content) {
            this.showNotification('⚠️ Completa todos los campos obligatorios');
            return;
        }

        const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

        const newPost = {
            id: 'post_' + Date.now(),
            category: category,
            title: title,
            content: content,
            tags: tags,
            author: this.currentUser.name,
            avatar: this.currentUser.avatar,
            timestamp: new Date(),
            likes: 0,
            comments: 0,
            liked: false,
            bookmarked: false,
            commentsList: []
        };

        this.forumData.unshift(newPost); // Agregar al inicio
        this.saveForumData();
        this.hideNewPostModal();
        this.renderForumPosts();
        this.showNotification('🎉 ¡Post publicado exitosamente!');
    }

    getTimeAgo(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Ahora mismo';
        if (minutes < 60) return `Hace ${minutes} min`;
        if (hours < 24) return `Hace ${hours}h`;
        if (days < 7) return `Hace ${days} días`;
        return timestamp.toLocaleDateString();
    }

    saveForumData() {
        localStorage.setItem('forumData_' + this.currentUser.community, JSON.stringify(this.forumData));
    }

    toggleBookmark(postId) {
        const post = this.forumData.find(p => p.id === postId);
        if (!post) return;

        post.bookmarked = !post.bookmarked;
        this.saveForumData();
        this.renderForumPosts();
        this.showNotification(post.bookmarked ? '🔖 Post guardado!' : '📖 Post removido de guardados');
    }

    sharePost(postId) {
        const post = this.forumData.find(p => p.id === postId);
        if (!post) return;

        const shareData = {
            title: post.title,
            text: post.content,
            url: window.location.href
        };

        if (navigator.share) {
            navigator.share(shareData);
        } else {
            // Fallback: copiar al portapapeles
            navigator.clipboard.writeText(`${post.title}\n\n${post.content}\n\n${window.location.href}`);
            this.showNotification('📋 Enlace copiado al portapapeles!');
        }
    }

    filterByCategory(categoryId) {
        const postsContainer = document.querySelector('.posts-container');
        if (!postsContainer) return;

        const posts = postsContainer.querySelectorAll('.forum-post');
        posts.forEach(post => {
            const postCategory = post.dataset.category;
            if (categoryId === 'all' || postCategory === categoryId) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });

        // Actualizar botones de categoría
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${categoryId}"]`).classList.add('active');
    }

    searchPosts(query) {
        const postsContainer = document.querySelector('.posts-container');
        if (!postsContainer) return;

        const posts = postsContainer.querySelectorAll('.forum-post');
        const searchTerm = query.toLowerCase();

        posts.forEach(post => {
            const title = post.querySelector('.post-title').textContent.toLowerCase();
            const content = post.querySelector('.post-text').textContent.toLowerCase();
            const author = post.querySelector('.post-author').textContent.toLowerCase();

            if (title.includes(searchTerm) || content.includes(searchTerm) || author.includes(searchTerm)) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    }

    showNotification(message) {
        // Crear notificación temporal
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('forum-posts')) {
        window.forumInteractions = new ForumInteractions();
    }
});

// Agregar estilos CSS dinámicamente
const forumStyles = `
    <style>
        .forum-header {
            background: white;
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 25px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            backdrop-filter: blur(10px);
        }

        .forum-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
            border-radius: 20px 20px 0 0;
        }

        .forum-stats {
            display: flex;
            gap: 20px;
            margin-bottom: 25px;
        }

        .forum-stats .stat-item {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            color: white;
            padding: 16px 20px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14px;
            font-weight: 600;
            box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
            transition: all 0.3s ease;
            min-width: 140px;
        }

        .forum-stats .stat-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
        }

        .forum-stats .stat-item i {
            font-size: 18px;
            opacity: 0.9;
        }

        .forum-stats .stat-item span {
            font-size: 16px;
            font-weight: 700;
        }

        .forum-filters {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .search-box {
            position: relative;
            max-width: 500px;
            margin-bottom: 20px;
        }

        .search-box i {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: #6b7280;
            font-size: 16px;
            z-index: 2;
        }

        .search-box input {
            width: 100%;
            padding: 16px 20px 16px 50px;
            border: 2px solid #e5e7eb;
            border-radius: 16px;
            font-size: 16px;
            background: #f8fafc;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .search-box input:focus {
            outline: none;
            border-color: #3b82f6;
            background: white;
            box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
            transform: translateY(-1px);
        }

        .search-box input::placeholder {
            color: #9ca3af;
            font-weight: 500;
        }

        .category-filters {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
        }

        .category-btn {
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 24px;
            padding: 12px 20px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            color: #475569;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            position: relative;
            overflow: hidden;
        }

        .category-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            transition: left 0.5s ease;
        }

        .category-btn:hover {
            background: #e2e8f0;
            border-color: #cbd5e1;
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }

        .category-btn:hover::before {
            left: 100%;
        }

        .category-btn.active {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            border-color: #3b82f6;
            box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
        }

        .category-btn.active:hover {
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        .category-btn i {
            font-size: 16px;
        }

        .posts-container {
            margin-bottom: 20px;
        }

        .forum-post {
            background: white;
            border-radius: 20px;
            padding: 25px;
            margin-bottom: 25px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            border: 1px solid rgba(255,255,255,0.2);
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
        }

        .forum-post::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .forum-post:hover {
            box-shadow: 0 8px 32px rgba(0,0,0,0.12);
            transform: translateY(-4px);
            border-color: rgba(59, 130, 246, 0.2);
        }

        .forum-post:hover::before {
            opacity: 1;
        }

        .post-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        .post-author-info {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .post-category {
            background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
            color: #0369a1;
            padding: 6px 12px;
            border-radius: 16px;
            font-size: 12px;
            font-weight: 600;
            display: inline-block;
            margin-top: 6px;
            border: 1px solid #bae6fd;
            box-shadow: 0 2px 8px rgba(3, 105, 161, 0.1);
        }

        .post-menu {
            position: relative;
        }

        .menu-btn {
            background: none;
            border: none;
            color: #6b7280;
            cursor: pointer;
            padding: 8px;
            border-radius: 50%;
            transition: all 0.3s ease;
        }

        .menu-btn:hover {
            background: #f3f4f6;
            color: #374151;
        }

        .post-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 10px;
        }

        .tag {
            background: #e0f2fe;
            color: #0369a1;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 500;
        }

        .post-avatar {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            margin-right: 16px;
            object-fit: cover;
            border: 3px solid #e2e8f0;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }

        .post-avatar:hover {
            border-color: #3b82f6;
            transform: scale(1.05);
        }

        .post-author-info h4 {
            margin: 0;
            font-size: 18px;
            font-weight: 700;
            color: #1e293b;
            background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .post-time {
            font-size: 13px;
            color: #64748b;
            font-weight: 500;
        }

        .post-title {
            font-size: 22px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 15px;
            line-height: 1.3;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .post-text {
            color: #475569;
            line-height: 1.7;
            margin-bottom: 20px;
            font-size: 16px;
            font-weight: 500;
        }

        .post-actions {
            display: flex;
            gap: 16px;
            padding-top: 20px;
            border-top: 2px solid #f1f5f9;
            margin-top: 20px;
        }

        .action-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            color: #64748b;
            cursor: pointer;
            padding: 12px 16px;
            border-radius: 16px;
            transition: all 0.3s ease;
            font-size: 14px;
            font-weight: 600;
            position: relative;
            overflow: hidden;
        }

        .action-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
            transition: left 0.5s ease;
        }

        .action-btn:hover {
            background: #e2e8f0;
            border-color: #cbd5e1;
            color: #475569;
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }

        .action-btn:hover::before {
            left: 100%;
        }

        .action-btn.liked {
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
            border-color: #fecaca;
            color: #dc2626;
        }

        .action-btn.liked:hover {
            background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
            border-color: #fca5a5;
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(220, 38, 38, 0.2);
        }

        .action-btn.bookmarked {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border-color: #fcd34d;
            color: #d97706;
        }

        .action-btn.bookmarked:hover {
            background: linear-gradient(135deg, #fde68a 0%, #fcd34d 100%);
            border-color: #fbbf24;
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(217, 119, 6, 0.2);
        }

        .post-comments {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
        }

        .comment-item {
            display: flex;
            gap: 12px;
            margin-bottom: 15px;
        }

        .comment-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            object-fit: cover;
        }

        .comment-content {
            flex: 1;
        }

        .comment-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 5px;
        }

        .comment-author {
            font-weight: 600;
            color: #1f2937;
            font-size: 14px;
        }

        .comment-time {
            font-size: 12px;
            color: #6b7280;
        }

        .comment-text {
            color: #6b7280;
            margin-bottom: 8px;
            line-height: 1.5;
        }

        .like-comment-btn {
            background: none;
            border: none;
            color: #6b7280;
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 12px;
            transition: all 0.3s ease;
        }

        .like-comment-btn:hover {
            background: #f3f4f6;
        }

        .like-comment-btn.liked {
            color: #ef4444;
        }

        .add-comment-section {
            display: flex;
            gap: 12px;
            margin-top: 15px;
        }

        .comment-input-container {
            flex: 1;
            display: flex;
            gap: 8px;
        }

        .comment-input {
            flex: 1;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 8px 12px;
            resize: none;
            font-family: inherit;
            font-size: 14px;
        }

        .comment-input:focus {
            outline: none;
            border-color: #3b82f6;
        }

        .add-comment-btn {
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 8px 12px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .add-comment-btn:hover {
            background: #2563eb;
        }

        .new-post-section {
            text-align: center;
            margin-top: 40px;
            padding: 30px;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-radius: 20px;
            border: 2px dashed #cbd5e1;
        }

        .new-post-btn {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            border: none;
            padding: 16px 32px;
            border-radius: 20px;
            font-weight: 700;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.4s ease;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
            position: relative;
            overflow: hidden;
        }

        .new-post-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.6s ease;
        }

        .new-post-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 28px rgba(59, 130, 246, 0.4);
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        }

        .new-post-btn:hover::before {
            left: 100%;
        }

        .new-post-btn i {
            font-size: 18px;
        }

        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }

        .modal-content {
            background: white;
            border-radius: 24px;
            width: 90%;
            max-width: 600px;
            max-height: 85vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0,0,0,0.2);
            border: 1px solid rgba(255,255,255,0.2);
            animation: slideUp 0.4s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideUp {
            from { 
                opacity: 0;
                transform: translateY(30px) scale(0.95);
            }
            to { 
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 30px 30px 20px 30px;
            border-bottom: 2px solid #f1f5f9;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-radius: 24px 24px 0 0;
        }

        .modal-header h3 {
            margin: 0;
            color: #0f172a;
            font-size: 24px;
            font-weight: 800;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .close-modal {
            background: #f1f5f9;
            border: 2px solid #e2e8f0;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 18px;
            cursor: pointer;
            color: #64748b;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }

        .close-modal:hover {
            background: #e2e8f0;
            border-color: #cbd5e1;
            color: #475569;
            transform: scale(1.1);
        }

        .modal-body {
            padding: 30px;
        }

        .form-group {
            margin-bottom: 25px;
        }

        .form-group label {
            display: block;
            margin-bottom: 12px;
            font-weight: 700;
            color: #1e293b;
            font-size: 16px;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
            width: 100%;
            border: 2px solid #e2e8f0;
            border-radius: 16px;
            padding: 16px 20px;
            font-family: inherit;
            font-size: 16px;
            background: #f8fafc;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .form-group select {
            background: white;
            cursor: pointer;
        }

        .form-group small {
            color: #64748b;
            font-size: 13px;
            margin-top: 8px;
            display: block;
            font-weight: 500;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
            outline: none;
            border-color: #3b82f6;
            background: white;
            box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
            transform: translateY(-1px);
        }

        .form-group textarea {
            resize: vertical;
            min-height: 100px;
        }

        .modal-footer {
            display: flex;
            gap: 16px;
            justify-content: flex-end;
            padding: 20px 30px 30px 30px;
            border-top: 2px solid #f1f5f9;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-radius: 0 0 24px 24px;
        }

        .btn {
            padding: 14px 28px;
            border-radius: 16px;
            font-weight: 700;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid transparent;
            position: relative;
            overflow: hidden;
        }

        .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s ease;
        }

        .btn:hover::before {
            left: 100%;
        }

        .btn-secondary {
            background: #f8fafc;
            color: #64748b;
            border-color: #e2e8f0;
        }

        .btn-secondary:hover {
            background: #e2e8f0;
            border-color: #cbd5e1;
            color: #475569;
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }

        .btn-primary {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            border-color: #3b82f6;
            box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
        }

        .btn-primary:hover {
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
            border-color: #2563eb;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }

        @media (max-width: 768px) {
            .forum-header {
                padding: 20px;
                margin-bottom: 20px;
            }

            .forum-stats {
                flex-direction: column;
                gap: 12px;
            }

            .forum-stats .stat-item {
                min-width: auto;
                padding: 12px 16px;
            }

            .search-box {
                max-width: 100%;
            }

            .category-filters {
                gap: 8px;
            }

            .category-btn {
                padding: 10px 16px;
                font-size: 13px;
            }

            .post-actions {
                flex-wrap: wrap;
                gap: 12px;
            }

            .action-btn {
                padding: 10px 14px;
                font-size: 13px;
            }
            
            .modal-content {
                width: 95%;
                margin: 20px;
                max-height: 90vh;
            }

            .modal-header {
                padding: 20px 20px 15px 20px;
            }

            .modal-body {
                padding: 20px;
            }

            .modal-footer {
                flex-direction: column;
                padding: 15px 20px 20px 20px;
            }

            .btn {
                width: 100%;
                padding: 16px 24px;
            }

            .new-post-section {
                padding: 20px;
                margin-top: 30px;
            }

            .new-post-btn {
                padding: 14px 28px;
                font-size: 15px;
            }
        }

        @media (max-width: 480px) {
            .forum-header {
                padding: 15px;
            }

            .forum-stats .stat-item {
                padding: 10px 14px;
                font-size: 13px;
            }

            .category-btn {
                padding: 8px 12px;
                font-size: 12px;
            }

            .post-title {
                font-size: 18px;
            }

            .post-text {
                font-size: 14px;
            }

            .action-btn {
                padding: 8px 12px;
                font-size: 12px;
            }
        }
    </style>
`;

// Agregar estilos al documento
document.head.insertAdjacentHTML('beforeend', forumStyles);
