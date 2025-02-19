const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = './pages/register/register.css';
document.head.appendChild(link);

const Register = () => {
  const container = document.createElement('div');
  container.classList.add('register-page');

  container.innerHTML = `
    <div class="register-overlay"></div>
    <form class="register-form">
      <h2>Registro</h2>
      <input type="text" id="username" class="register-input" placeholder="Nombre de usuario" required>
      <input type="email" id="email" class="register-input" placeholder="Correo electrónico" required>
      <input type="password" id="password" class="register-input" placeholder="Contraseña" required>
      <button type="submit" class="register-btn">Registrarse</button>
      <button type="button" class="cancel-btn">Cancelar</button>
      <p class="login-text">¿Ya tienes cuenta? <a href="#" id="login-link">Inicia sesión</a></p>
    </form>
  `;

  // Evento para registrar usuario
  container
    .querySelector('.register-form')
    .addEventListener('submit', async (event) => {
      event.preventDefault(); // Evitar recarga de la página

      const userName = document.querySelector('#username').value;
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;

      if (!userName || !email || !password) {
        alert('Todos los campos son obligatorios');
        return;
      }

      const newUser = { userName, email, password };

      try {
        const response = await fetch(
          'http://localhost:3000/api/v1/users/register',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
          }
        );

        const data = await response.json();

        if (response.ok) {
          alert('Registro exitoso. Ahora puedes iniciar sesión.');
          window.navigateTo('login'); // Redirigir al login
        } else {
          alert(data.message || 'Error al registrar usuario.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error en el registro.');
      }
    });

  // Evento para cancelar y volver al login
  container.querySelector('.cancel-btn').addEventListener('click', (event) => {
    event.preventDefault();
    window.navigateTo('login');
  });

  // Evento para ir al login desde el enlace
  container.querySelector('#login-link').addEventListener('click', (event) => {
    event.preventDefault();
    window.navigateTo('login');
  });

  return container;
};

export default Register;
