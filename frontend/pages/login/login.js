const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = './pages/login/login.css';
document.head.appendChild(link);

const Login = () => {
  const container = document.createElement('div');
  container.classList.add('login-page');

  container.innerHTML = `
    <div class="login-overlay"></div>
    <form class="login-form">
      <h2>Iniciar Sesión</h2>
      <input type="email" class="login-input" placeholder="Correo electrónico" required>
      <input type="password" class="login-input" placeholder="Contraseña" required>
      <button type="submit" class="login-btn">Acceder</button>
      <button type="button" class="cancel-btn">Cancelar</button>
      <p class="register-text">¿No tienes cuenta? <a href="#" id="register-link">Regístrate</a></p>
    </form>
  `;

  container.querySelector('.cancel-btn').addEventListener('click', (event) => {
    event.preventDefault();
    navigateTo('pets'); // Ir a la página principal
  });

  container
    .querySelector('#register-link')
    .addEventListener('click', (event) => {
      event.preventDefault();
      navigateTo('register');
    });

  return container; // Devuelve el nodo HTML
};

export default Login;
