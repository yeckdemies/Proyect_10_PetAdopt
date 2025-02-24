import { navigate } from '../../utils/functions/navigate';
import { routes } from '../../utils/routes/routes';
import './Header.css';

export const Header = () => {
  const header = document.createElement('header');
  const logo = document.createElement('div');
  const nav = document.createElement('nav');
  const ul = document.createElement('ul');
  const button = document.createElement('button');
  ul.className = 'nav-menu';
  button.className = 'menu-toggle';
  button.setAttribute('aria-label', 'Toggle Menu');
  button.textContent = '☰';
  nav.appendChild(button);
  button.addEventListener('click', () => {
    ul.classList.toggle('open');
  });

  logo.className = 'logo';

  const a = document.createElement('a');
  const img = document.createElement('img');
  img.src =
    'https://res.cloudinary.com/dszffglcl/image/upload/v1739986326/PetAdopt%20Images/m1b9eaa8bikoc0ouv9ca.png';
  img.alt = 'PetAdopt Logo';
  a.href = routes[0].path;
  a.appendChild(img);
  logo.appendChild(a);

  a.addEventListener('click', (e) => navigate(e, routes[0]));

  for (const route of routes) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = route.path;
    a.textContent = route.name;

    a.addEventListener('click', (e) => navigate(e, route));

    li.appendChild(a);
    ul.appendChild(li);
  }
  header.appendChild(logo);
  header.appendChild(nav);
  nav.appendChild(ul);

  app.appendChild(header);
};
