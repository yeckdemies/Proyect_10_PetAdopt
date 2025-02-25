import { Header } from '../../components/Header/Header';
import { navigate } from '../../utils/functions/navegate';
import { routes } from '../../utils/routes/routes';
import './LoginRegister.css';

export const LoginRegister = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const loginDiv = document.createElement('div');
  loginDiv.classList.add('login-overlay');

  Login(loginDiv);

  loginDiv.id = 'login';

  main.append(loginDiv);
};

const Login = (elementoPadre) => {
  const container = document.createElement('div');
  container.classList.add('login-page');

  const form = document.createElement('form');
  form.classList.add('login-form');

  const h2 = document.createElement('h2');
  h2.textContent = 'Iniciar Sesión';

  const inputUser = document.createElement('input');
  const inputEmail = document.createElement('input');
  const inputPassword = document.createElement('input');
  const acceder = document.createElement('button');
  const cancelar = document.createElement('button');
  const p = document.createElement('p');

  acceder.type = 'submit';
  acceder.classList.add('login-btn');
  acceder.textContent = 'Acceder';

  cancelar.type = 'button';
  cancelar.classList.add('cancel-btn');
  cancelar.textContent = 'Cancelar';

  p.classList.add('register-text');
  p.textContent = '¿No tienes cuenta?';

  const registerLink = document.createElement('a');
  registerLink.href = '#';
  registerLink.id = 'register-link';
  registerLink.textContent = 'Regístrate';

  const loginText = document.createElement('p');
  loginText.classList.add('login-text');
  loginText.innerHTML =
    '¿Ya tienes cuenta? <a href="#" id="login-link">Inicia sesión</a>';
  loginText.style.display = 'none';

  const loginLink = loginText.querySelector('#login-link');

  inputUser.type = 'text';
  inputUser.placeholder = 'Nombre de usuario';
  inputUser.required = true;
  inputUser.classList.add('login-input');

  inputEmail.type = 'email';
  inputEmail.placeholder = 'Correo electrónico';
  inputEmail.required = false; // Lo haremos opcional para evitar errores en login
  inputEmail.classList.add('login-input', 'hidden');

  inputPassword.type = 'password';
  inputPassword.placeholder = 'Contraseña';
  inputPassword.required = true;
  inputPassword.classList.add('login-input');

  form.append(h2);
  form.append(inputUser);
  form.append(inputEmail);
  form.append(inputPassword);
  form.append(acceder);
  form.append(cancelar);
  form.append(p);
  form.append(registerLink);
  form.append(loginText);

  container.append(form);
  elementoPadre.append(container);

  let isRegisterMode = false;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (isRegisterMode) {
      submitRegister(
        inputUser.value,
        inputEmail.value,
        inputPassword.value,
        form
      );
    } else {
      submitLogin(inputUser.value, inputPassword.value, form);
    }
  });

  cancelar.addEventListener('click', (event) => {
    event.preventDefault();
    cerrarFormulario();
  });

  registerLink.addEventListener('click', (event) => {
    event.preventDefault();
    isRegisterMode = true;
    h2.textContent = 'Regístrate';
    inputEmail.classList.remove('hidden');
    inputEmail.required = true;
    registerLink.style.display = 'none';
    p.style.display = 'none';
    loginText.style.display = 'block';
    acceder.textContent = 'Registrarse';
  });

  loginLink.addEventListener('click', (event) => {
    event.preventDefault();
    isRegisterMode = false;
    h2.textContent = 'Iniciar Sesión';
    inputEmail.classList.add('hidden');
    inputEmail.required = false;
    registerLink.style.display = 'block';
    p.style.display = 'block';
    acceder.textContent = 'Acceder';
    loginText.style.display = 'none';
  });
};

const cerrarFormulario = () => {
  const loginOverlay = document.querySelector('.login-overlay');
  if (loginOverlay) {
    loginOverlay.remove();
  }
  navigate({ preventDefault: () => {} }, routes[0]);
};

const submitLogin = async (userName, password, form) => {
  const objetoFinal = JSON.stringify({
    userName,
    password
  });

  const opciones = {
    method: 'POST',
    body: objetoFinal,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const res = await fetch('http://localhost:3000/api/v1/users/login', opciones);

  handleResponse(res, form);
};

const submitRegister = async (userName, email, password, form) => {
  const objetoFinal = JSON.stringify({
    userName,
    email,
    password
  });

  const opciones = {
    method: 'POST',
    body: objetoFinal,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const res = await fetch(
    'http://localhost:3000/api/v1/users/register',
    opciones
  );

  handleResponse(res, form);
};

const handleResponse = async (res, form) => {
  if (res.status === 400) {
    const pError = document.createElement('p');
    pError.classList.add('error');
    pError.textContent = 'Error, usuario o contraseña incorrectos';
    pError.style.color = 'red';

    form.append(pError);
    return;
  }

  const pError = document.querySelector('.error');
  if (pError) {
    pError.remove();
  }

  const respuestaFinal = await res.json();

  localStorage.setItem('token', respuestaFinal.token);
  localStorage.setItem('user', JSON.stringify(respuestaFinal.user));

  cerrarFormulario();
  location.reload();
};
