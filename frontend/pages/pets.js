const template = () => `
  <section id="pets">
    <ul id="petscontainer">
    </ul>
  </section>
`;

import createCard from '../components/Card/Card.js';

const getPets = async () => {
  const petsData = await fetch(
    'http://localhost:3000/api/v1/pets/getAvailablePets/'
  );
  const petsResponse = await petsData.json();

  if (!petsResponse || !petsResponse.availablePets) {
    throw new Error('Invalid API response: availablePets is missing');
  }

  const pets = petsResponse.availablePets;
  console.log('Pets Array:', pets);

  // Seleccionar el contenedor `main`
  const main = document.querySelector('main');

  // Crear el contenedor de las tarjetas si no existe
  let petsContainer = document.querySelector('#petscontainer');
  if (!petsContainer) {
    petsContainer = document.createElement('ul');
    petsContainer.id = 'petscontainer';
    main.appendChild(petsContainer);
  }

  // Limpiar el contenedor antes de agregar nuevas tarjetas
  petsContainer.innerHTML = '';

  for (const pet of pets) {
    const card = createCard(pet);
    petsContainer.appendChild(card);
  }
};

const Pets = () => {
  document.querySelector('main').innerHTML = template();
  getPets();
};

export default Pets;
