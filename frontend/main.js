// Importa el archivo de estilos CSS.
import './style.css';

// Importa el módulo 'Books' desde el archivo "./pages/Books".
import Books from './pages/Books';

// Importa el módulo 'Login' desde el archivo "./pages/Login".
import Login from './pages/Login';

// Importa el módulo 'Register' desde el archivo "./pages/Register".
import Register from './pages/Register';

// Importa el módulo 'Favs' desde el archivo "./pages/Favs".
import Favs from './pages/Favs';

// Añade un controlador de eventos para el clic en el elemento con id "bookslink", que llama a la función Books().
document.querySelector('#bookslink').addEventListener('click', () => Books());

// Añade un controlador de eventos para el clic en el elemento con id "loginlink", que llama a la función Login().
document.querySelector('#loginlink').addEventListener('click', () => Login());

// Añade un controlador de eventos para el clic en el elemento con id "registerlink", que llama a la función Register().
document
  .querySelector('#registerlink')
  .addEventListener('click', () => Register());

// Añade un controlador de eventos para el clic en el elemento con id "favslink", que llama a la función Favs().
document.querySelector('#favslink').addEventListener('click', () => Favs());

// Añade un controlador de eventos para el clic en el elemento con id "logoutlink", que elimina el usuario del almacenamiento local,
// muestra un mensaje de despedida y llama a la función Login().
document.querySelector('#logoutlink').addEventListener('click', () => {
  localStorage.removeItem('user');
  alert('See you soon!');
  Login();
});

// Llama directamente a la función Books() para cargar los libros cuando se carga la página.
Books();
