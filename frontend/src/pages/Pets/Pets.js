import './Pets.css';
import { createCard } from '../../components/Card/Card';

export const Pets = async () => {
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

  if (!petsResponse || !petsResponse.availablePets) {
    throw new Error('Invalid API response: availablePets is missing');
  }

  const pets = petsResponse.availablePets;

  const petsContainer = container.querySelector('#petscontainer');

  petsContainer.innerHTML = '';

  for (const pet of pets) {
    const li = document.createElement('li');
    const card = createCard(pet);
    li.appendChild(card);
    petsContainer.append(li);
  }

  main.append(container);
};
