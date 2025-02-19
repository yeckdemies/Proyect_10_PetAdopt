const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = './components/Card/Card.css';
document.head.appendChild(link);

import FavoriteButton from '../FavoriteButton/FavoriteButton.js';
import Button from '../Button/Button.js';

const createCard = (pet) => {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <div class="favorite-container"></div> <!-- Corazón sobre la imagen -->
    <img src="${pet.imageUrl}" alt="${pet.name}" class="card-img">
    <div class="card-body">
      <h3 class="card-title">${pet.name}</h3>
      <p class="card-info">Chip: ${pet.chip}</p>
      <p class="card-info">Edad: ${pet.age} años</p>
      <p class="card-info">Sexo: ${pet.sexo}</p>
      <p class="card-info">Tamaño: ${pet.size}</p>
      <div class="button-container"></div>
    </div>
  `;

  const buttonContainer = card.querySelector('.button-container');
  buttonContainer.appendChild(Button('Adoptar'));

  const favoriteContainer = card.querySelector('.favorite-container');
  favoriteContainer.appendChild(FavoriteButton(pet));

  return card;
};

export default createCard;
