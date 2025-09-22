document.addEventListener('DOMContentLoaded', function() {

    // --- Lógica para el menú desplegable "Comunidad" ---
    const dropdownToggle = document.querySelector('.navbar .dropdown > a');

    if (dropdownToggle) {
        const dropdownContent = dropdownToggle.nextElementSibling;

        dropdownToggle.addEventListener('click', function(event) {
            // Previene que el enlace navegue a '#comunidad'
            event.preventDefault();
            // Muestra u oculta el menú desplegable añadiendo o quitando la clase 'show'
            dropdownContent.classList.toggle('show');
        });
    }

    // --- Cierra el menú desplegable si se hace clic fuera de él ---
    window.addEventListener('click', function(event) {
        // Comprueba si el clic no fue en el menú desplegable o su botón
        if (!event.target.closest('.dropdown')) {
            // Busca todos los menús desplegables abiertos y los cierra
            const openDropdowns = document.querySelectorAll('.navbar .dropdown-content.show');
            openDropdowns.forEach(function(dropdown) {
                dropdown.classList.remove('show');
            });
        }
    });

    // --- Lógica para el menú de hamburguesa ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.navbar .nav-links');
    const menuIcon = document.querySelector('.menu-toggle i');

    if (menuToggle && navLinks && menuIcon) {
        menuToggle.addEventListener('click', function() {
            // Muestra u oculta el menú de navegación
            navLinks.classList.toggle('active-mobile');

            // Cambia el icono de hamburguesa a 'X' y viceversa
            if (navLinks.classList.contains('active-mobile')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    }

    // --- Lógica para el acordeón de FAQ ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Cierra otros items abiertos para que solo uno esté abierto a la vez
            const openItem = document.querySelector('.faq-item.active');
            if (openItem && openItem !== item) {
                openItem.classList.remove('active');
            }
            // Abre o cierra el item actual
            item.classList.toggle('active');
        });
    });

    // --- Lógica para animación de testimonios al hacer scroll ---
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    const observerOptions = {
        root: null, // Observa en relación al viewport
        rootMargin: '0px',
        threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Deja de observar el elemento una vez animado
            }
        });
    }, observerOptions);

    testimonialCards.forEach(card => observer.observe(card));

    // --- Lógica para resaltar el enlace activo en la barra de navegación al hacer scroll ---
    const scrollSections = document.querySelectorAll('section[id]');
    const navScrollLinks = document.querySelectorAll('.navbar .nav-links a[href^="#"]');
    const navHeight = document.querySelector('.navbar').offsetHeight;

    const activateLink = () => {
        let currentSectionId = '';
        scrollSections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 50; // 50px de margen
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navScrollLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active-link');
            }
        });
    };

    window.addEventListener('scroll', activateLink);

    // --- Lógica para el interruptor de tema (Modo Oscuro/Claro) ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Función para aplicar el tema
    const applyTheme = (theme) => {
        body.classList.toggle('dark-mode', theme === 'dark');
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
        localStorage.setItem('theme', theme);
    };

    // Event listener para el botón
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    }

    // Aplicar el tema guardado al cargar la página
    const savedTheme = localStorage.getItem('theme') || 'light'; // 'light' es el predeterminado
    applyTheme(savedTheme);

    // --- Language dropdown (flags) ---
    const langBtn = document.getElementById('lang-btn');
    const langMenu = document.getElementById('lang-menu');

    const setLanguage = (lang) => {
        const flagMap = { es: '🇲🇽', en: '🇺🇸', fr: '🇫🇷', de: '🇩🇪', it: '🇮🇹' };
        const current = flagMap[lang] || '🇲🇽';
        if (langBtn) {
            langBtn.querySelector('.flag').textContent = current;
        }
        localStorage.setItem('lang', lang);
        // Aquí podrías disparar traducciones si tienes i18n
    };

    if (langBtn && langMenu) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langMenu.classList.toggle('open');
        });
        langMenu.addEventListener('click', (e) => {
            const option = e.target.closest('.lang-option');
            if (!option) return;
            const lang = option.getAttribute('data-lang');
            setLanguage(lang);
            langMenu.classList.remove('open');
        });
        window.addEventListener('click', () => langMenu.classList.remove('open'));

        // Aplicar idioma guardado
        const savedLang = localStorage.getItem('lang') || 'es';
        setLanguage(savedLang);
    }
});