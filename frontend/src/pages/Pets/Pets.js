import './Pets.css';
import { createCard } from '../../components/Card/Card';
import { hideLoader, showLoader } from '../../components/Loader/Loader';

export const Pets = async () => {
  showLoader();
  const main = document.querySelector('main');
  main.innerHTML = '';

  const container = document.createElement('section');
  container.id = 'pets';

  const ul = document.createElement('ul');
  ul.id = 'petscontainer';

  container.appendChild(ul);

  const petsData = await fetch(
    'http://localhost:3000/api/v1/pets/getAvailablePets/'
  );
  const petsResponse = await petsData.json();

  hideLoader();

  if (!petsResponse || !petsResponse.availablePets) {
    throw new Error('Invalid API response: availablePets is missing');
  }

  const pets = petsResponse.availablePets;

  const petsContainer = container.querySelector('#petscontainer');

  petsContainer.innerHTML = '';

  for (const pet of pets) {
    const li = document.createElement('li');

    const card = await createCard({
      ...pet,
      showAdoptButton: true,
      showFavorite: true
    });

    li.appendChild(card);
    petsContainer.append(li);
  }

  main.append(container);
};
