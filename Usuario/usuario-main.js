document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.querySelector('.login-btn');
    const googleLoginBtn = document.querySelector('.google-login-btn');
    const closeBtn = document.querySelector('.close-btn');

    loginBtn.addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Aquí puedes añadir tu lógica para enviar los datos de inicio de sesión
        // Por ejemplo, una llamada a una API
        if (username && password) {
            alert(`Intentando iniciar sesión con Usuario: ${username} y Contraseña: ${password}`);
            // En un caso real, harías una petición AJAX/fetch aquí
        } else {
            alert('Por favor, ingresa tu usuario y contraseña.');
        }
    });

    googleLoginBtn.addEventListener('click', () => {
        alert('Redirigiendo para continuar con Google...');
        // En un caso real, iniciarías el flujo de autenticación de Google OAuth
    });

    closeBtn.addEventListener('click', () => {
        alert('Formulario cerrado');
        // Aquí podrías ocultar el formulario o redirigir
        document.querySelector('.login-container').style.display = 'none';
    });
});