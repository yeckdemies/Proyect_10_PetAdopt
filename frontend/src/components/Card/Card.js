import './Card.css';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';
import { Button } from '../Button/Button';

export const createCard = async (pet) => {
  const card = document.createElement('div');
  card.classList.add('card');

  if (pet.showFavorite) {
    const div = document.createElement('div');
    div.classList.add('favorite-container');
    card.appendChild(div);
  }

  const img = document.createElement('img');
  img.src = pet.imageUrl;
  img.alt = pet.name;
  img.classList.add('card-img');
  card.appendChild(img);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  card.appendChild(cardBody);

  const h3 = document.createElement('h3');
  h3.classList.add('card-title');
  h3.textContent = pet.name;
  cardBody.appendChild(h3);

  const p1 = document.createElement('p');
  p1.classList.add('card-info');
  p1.textContent = `Chip: ${pet.chip}`;
  cardBody.appendChild(p1);

  const p2 = document.createElement('p');
  p2.classList.add('card-info');
  p2.textContent = `Edad: ${pet.age} años`;
  cardBody.appendChild(p2);

  const p3 = document.createElement('p');
  p3.classList.add('card-info');
  p3.textContent = `Sexo: ${pet.sexo}`;
  cardBody.appendChild(p3);

  const p4 = document.createElement('p');
  p4.classList.add('card-info');
  p4.textContent = `Tamaño: ${pet.size}`;
  cardBody.appendChild(p4);

  const p5 = document.createElement('p');
  p5.classList.add('card-info');
  p5.textContent = `Especie: ${pet.type}`;
  cardBody.appendChild(p5);

  if (pet.showAdoptButton) {
    const div2 = document.createElement('div');
    div2.classList.add('button-container');
    cardBody.appendChild(div2);

    const buttonContainer = card.querySelector('.button-container');
    const button = Button('Adoptar');
    button.classList.add('adopt-btn');
    buttonContainer.append(button);
  }

  if (pet.showFavorite) {
    const favoriteContainer = card.querySelector('.favorite-container');
    const favoriteButton = await FavoriteButton(pet);
    favoriteContainer.append(favoriteButton);
  }

  return card;
};
