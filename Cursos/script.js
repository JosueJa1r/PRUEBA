document.addEventListener('DOMContentLoaded', function() {

    // --- Lógica para colapsar/expandir la barra lateral ---
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const sidebarToggle = document.getElementById('sidebar-toggle');

    if (sidebar && mainContent && sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('collapsed');
        });
    }

    // --- Lógica para la navegación interna del curso (sub-menú) ---
    const subMenuItems = document.querySelectorAll('.sub-menu-item');
    const contentSections = document.querySelectorAll('.step-content, .phase-content, .day-content, .module-content');

    // Ocultar todos los contenidos excepto el primero que está activo por defecto en el HTML
    contentSections.forEach(section => {
        const correspondingNavItem = document.querySelector(`.sub-menu-item[data-target="${section.id}"]`);
        if (correspondingNavItem && !correspondingNavItem.classList.contains('active')) {
            section.style.display = 'none';
        }
    });

    subMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Quitar clase 'active' de todos los items del mismo menú
            this.parentElement.querySelectorAll('.sub-menu-item').forEach(i => i.classList.remove('active'));
            // Añadir clase 'active' al item clickeado
            this.classList.add('active');

            // Ocultar todos los contenidos
            contentSections.forEach(section => section.style.display = 'none');

            // Mostrar el contenido correspondiente
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.style.display = 'block';
            }
        });
    });
});