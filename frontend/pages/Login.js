// Importa la función `Books` desde el módulo "./Books" para poder mostrarla
// una vez hayamos iniciado sesión
import Books from './Books';

// Define una función arrow llamada `template` que devuelve un tempalte string
const template = () => `
  <section id="login">
    ${
      // Utiliza un ternario para mostrar un mensaje de bienvenida si ya hay un usuario en el localStorage,
      // de lo contrario, muestra un formulario de inicio de sesión
      localStorage.getItem('user')
        ? `<h2>You are already logged<h2>`
        : `<form>
          <input type="text" placeholder="Username" id="username"/>
          <input type="password" id="password" placeholder="Password" />
          <button id="loginbtn">Login</button>
        </form>`
    }
  </section>
`;

// Define una función asincrónica llamada `loginSubmit` para procesar el envío del formulario de inicio de sesión
const loginSubmit = async () => {
  // Obtiene los valores de nombre de usuario y contraseña desde los campos de entrada del formulario
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  // Realiza una solicitud a la API para iniciar sesión
  const data = await fetch('http://localhost:3000/api/v1/users/login', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      userName: username,
      password: password
    })
  });

  // Convierte la respuesta a formato JSON
  const dataRes = await data.json();

  // Almacena la información del usuario en el localStorage
  localStorage.setItem('user', JSON.stringify(dataRes));

  // Muestra una alerta de bienvenida con el nombre de usuario
  alert(`Welcome ${username}`);

  // Llama a la función `Books` para actualizar la sección de libros en la página
  Books();
};

// Define una función llamada `Login` que actualiza el contenido de la sección de inicio de sesión en el DOM
const Login = () => {
  // Selecciona el elemento 'main' en el DOM y asigna el HTML generado por la función `template`
  document.querySelector('main').innerHTML = template();

  // Agrega un event listener al botón de inicio de sesión para procesar el evento de clic
  document.querySelector('#loginbtn').addEventListener('click', (ev) => {
    ev.preventDefault(); // Evita que el formulario recargue la página
    loginSubmit(); // Llama a la función `loginSubmit` para procesar el envío del formulario
  });
};

// Exporta la función `Login` como el valor predeterminado del módulo
export default Login;
