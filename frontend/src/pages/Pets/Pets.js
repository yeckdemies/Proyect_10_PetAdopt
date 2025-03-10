import './Pets.css';
import { createCard } from '../../components/Card/Card';
import { hideLoader, showLoader } from '../../components/Loader/Loader';
import { fetchAvailablePets } from '../../api/petsService';

const USER = JSON.parse(localStorage.getItem('user'));
const USER_ROLE = USER?.role;
const IS_LOGGED_IN = USER !== null;

export const Pets = async () => {
  showLoader();
  const main = document.querySelector('main');
  main.innerHTML = '';

  const container = document.createElement('section');
  container.id = 'pets';

  const ul = document.createElement('ul');
  ul.id = 'petscontainer';
  container.appendChild(ul);

  const pets = await fetchAvailablePets();
  hideLoader();

  if (!pets.length) {
    console.error('No pets found or invalid API response');
    return;
  }

  const petsContainer = container.querySelector('#petscontainer');
  petsContainer.innerHTML = '';

  for (const pet of pets) {
    const li = document.createElement('li');

    const card = await createCard({
      ...pet,
      showAdoptButton: USER_ROLE !== 'admin',
      showDeleteButton: USER_ROLE === 'admin',
      showFavorite: USER_ROLE !== 'admin',
      isLoggedIn: IS_LOGGED_IN
    });

    li.appendChild(card);
    petsContainer.append(li);
  }

  main.append(container);
};
