// Sistema de Gestión de Temas Avanzado para EmprendeIA
class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.themeToggle = null;
        this.body = document.body;
        this.init();
    }

    init() {
        this.themeToggle = document.getElementById('theme-toggle');
        if (!this.themeToggle) return;

        this.loadTheme();
        this.bindEvents();
        this.setupSystemThemeListener();
    }

    loadTheme() {
        // Verificar tema guardado o usar preferencia del sistema
        const savedTheme = localStorage.getItem('theme') || localStorage.getItem('emprendeia-theme');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        this.currentTheme = savedTheme || systemTheme;
        
        this.applyTheme(this.currentTheme);
        this.updateThemeIcon(this.currentTheme);
    }

    bindEvents() {
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    setupSystemThemeListener() {
        // Escuchar cambios en la preferencia del sistema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme') && !localStorage.getItem('emprendeia-theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                this.applyTheme(newTheme);
                this.updateThemeIcon(newTheme);
                this.currentTheme = newTheme;
            }
        });
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        this.saveTheme(newTheme);
        this.updateThemeIcon(newTheme);
        this.animateThemeTransition();
    }

    applyTheme(theme) {
        this.currentTheme = theme;
        this.body.setAttribute('data-theme', theme);
        
        // Actualizar meta theme-color para móviles
        this.updateMetaThemeColor(theme);
        
        // Actualizar favicon si es necesario
        this.updateFavicon(theme);
    }

    saveTheme(theme) {
        localStorage.setItem('theme', theme);
        localStorage.setItem('emprendeia-theme', theme);
    }

    updateThemeIcon(theme) {
        const icon = this.themeToggle.querySelector('i');
        if (!icon) return;

        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            icon.style.color = '#fbbf24';
            this.themeToggle.title = 'Cambiar a modo claro';
        } else {
            icon.className = 'fas fa-moon';
            icon.style.color = '#6366f1';
            this.themeToggle.title = 'Cambiar a modo oscuro';
        }
    }

    updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }

        if (theme === 'dark') {
            metaThemeColor.content = '#0f0f23';
        } else {
            metaThemeColor.content = '#ec4899';
        }
    }

    updateFavicon(theme) {
        // Opcional: cambiar favicon según el tema
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            // Aquí podrías cambiar el favicon según el tema
            // favicon.href = theme === 'dark' ? '/favicon-dark.ico' : '/favicon-light.ico';
        }
    }

    animateThemeTransition() {
        // Crear overlay de transición
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${this.currentTheme === 'dark' ? '#0f0f23' : '#ffffff'};
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;

        document.body.appendChild(overlay);

        // Animar overlay
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(overlay);
                }, 300);
            }, 150);
        });
    }

    // Método público para obtener el tema actual
    getCurrentTheme() {
        return this.currentTheme;
    }

    // Método público para establecer un tema específico
    setTheme(theme) {
        if (theme === 'dark' || theme === 'light') {
            this.applyTheme(theme);
            this.saveTheme(theme);
            this.updateThemeIcon(theme);
        }
    }

    // Método para detectar si el usuario prefiere modo oscuro
    prefersDarkMode() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
}

// Inicializar el gestor de temas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});

// Exportar para uso en otros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}
