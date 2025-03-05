import './Card.css';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';
import { Button } from '../Button/Button';
import { navigate } from '../../utils/functions/tools';
import { routes } from '../../utils/routes/routes';
import { createAdoption } from '../../api/adoptionService';
import { deletePet } from '../../api/petsService';
import { hideLoader } from '../Loader/Loader';

export const createCard = async (pet) => {
  const card = document.createElement('div');
  card.classList.add('card');

  const USER = JSON.parse(localStorage.getItem('user'));
  const isAdmin = USER?.role === 'admin';

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

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');
  cardBody.appendChild(buttonContainer);

  if (isAdmin) {
    const deleteButton = Button('Eliminar Mascota');
    deleteButton.classList.add('delete-pet-btn');

    deleteButton.addEventListener('click', async () => {
      const confirmDelete = confirm(
        `¿Seguro que quieres eliminar a ${pet.name}?`
      );
      if (!confirmDelete) return;

      const deleted = await deletePet(pet._id);
      hideLoader();
      if (deleted) {
        alert(`${pet.name} ha sido eliminada.`);
        location.reload();
      } else {
        alert('Hubo un error al eliminar la mascota.');
      }
    });

    buttonContainer.append(deleteButton);
  } else if (pet.showAdoptButton) {
    const adoptButton = Button('Adoptar');
    adoptButton.classList.add('adopt-btn');

    adoptButton.addEventListener('click', async () => {
      if (!USER) {
        navigate(
          { preventDefault: () => {} },
          routes.find((route) => route.name === 'Login')
        );
        return;
      }

      try {
        const response = await createAdoption(pet._id);
        hideLoader();
        if (response) {
          navigate(
            { preventDefault: () => {} },
            routes.find((route) => route.name === 'Adopciones')
          );
        } else {
          alert('No se pudo completar la adopción.');
          navigate(
            { preventDefault: () => {} },
            routes.find((route) => route.name === 'Animales')
          );
        }
      } catch (error) {
        console.error('Error en la adopción:', error);
        alert('No se pudo completar la adopción.');
        navigate(
          { preventDefault: () => {} },
          routes.find((route) => route.name === 'Animales')
        );
      }
    });

    buttonContainer.append(adoptButton);
  }

  if (pet.showFavorite) {
    const favoriteContainer = card.querySelector('.favorite-container');
    const favoriteButton = await FavoriteButton(pet);
    favoriteContainer.append(favoriteButton);
  }

  return card;
};
