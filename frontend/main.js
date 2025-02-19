import Pets from './pages/pets.js';
import Login from './pages/login/login.js';
import Register from './pages/register/register.js';
import Header from './components/Header/Header.js';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');

  const mainContainer = document.createElement('div');
  mainContainer.id = 'main-container';

  const main = document.createElement('main');
  main.id = 'main';

  app.appendChild(Header);
  app.appendChild(mainContainer);
  mainContainer.appendChild(main);

  const navigateTo = async (page) => {
    main.innerHTML = '';

    if (page === 'login') {
      main.appendChild(Login());
    } else if (page === 'register') {
      main.appendChild(Register());
    } else {
      main.appendChild(await Pets());
    }
  };

  window.navigateTo = navigateTo;

  document.querySelector('#petslink').addEventListener('click', (event) => {
    event.preventDefault();
    navigateTo('pets');
  });

  document.querySelector('#login-link').addEventListener('click', (event) => {
    event.preventDefault();
    navigateTo('login');
  });

  navigateTo('pets');
});
