import Pets from './pages/pets.js';
import Header from './components/Header/Header.js';

const app = document.querySelector('#app');

const mainContainer = document.createElement('div');
mainContainer.id = 'main-container';

const main = document.createElement('main');
main.id = 'main';

app.appendChild(Header);
app.appendChild(mainContainer);
mainContainer.appendChild(main);

document.querySelector('#petslink').addEventListener('click', (event) => {
  event.preventDefault();
  Pets();
});

Pets();
