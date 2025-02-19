import createCard from '../components/Card/Card.js';

const Pets = async () => {
  const container = document.createElement('section');
  container.id = 'pets';
  container.innerHTML = `<ul id="petscontainer"></ul>`;

  const petsData = await fetch(
    'http://localhost:3000/api/v1/pets/getAvailablePets/'
  );
  const petsResponse = await petsData.json();

  if (!petsResponse || !petsResponse.availablePets) {
    throw new Error('Invalid API response: availablePets is missing');
  }

  const pets = petsResponse.availablePets;
  console.log('Pets Array:', pets);

  const petsContainer = container.querySelector('#petscontainer');

  // Limpiar antes de agregar nuevas tarjetas
  petsContainer.innerHTML = '';

  for (const pet of pets) {
    const card = createCard(pet);
    petsContainer.appendChild(card);
  }

  return container; // Devuelve un nodo HTML
};

export default Pets;
