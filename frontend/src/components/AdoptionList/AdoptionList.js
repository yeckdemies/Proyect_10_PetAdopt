import {
  fetchAdoptions,
  deleteAdoption,
  updateAdoption
} from '../../api/adoptionService';
import { createCard } from '../Card/Card';
import { showLoader, hideLoader } from '../Loader/Loader';
import { deletePet } from '../../api/petsService';
import './AdoptionList.css';

const USER = JSON.parse(localStorage.getItem('user'));
const USER_ROLE = USER?.role;
const USER_ID = USER?._id;

export const AdoptionList = async (filter = 'Pending') => {
  showLoader();
  const main = document.querySelector('main');
  main.innerHTML = '';

  const container = document.createElement('section');
  container.id = 'adoptions';

  if (USER_ROLE === 'admin') {
    const filterContainer = document.createElement('div');
    filterContainer.classList.add('filter-container');

    ['Pending', 'Approved', 'Rejected'].forEach((status) => {
      const button = document.createElement('button');
      button.textContent = status;
      button.classList.add('filter-button');
      if (filter === status) button.classList.add('active-filter');
      button.addEventListener('click', () => AdoptionList(status));
      filterContainer.appendChild(button);
    });

    container.appendChild(filterContainer);
  }

  const adoptionContainer = document.createElement('div');
  adoptionContainer.id = 'adoption-container';
  container.appendChild(adoptionContainer);

  const adoptions = await fetchAdoptions();
  hideLoader();

  if (!adoptions || !Array.isArray(adoptions)) {
    console.error('Invalid API response');
    return;
  }

  const filteredAdoptions = adoptions.filter((adoption) => {
    if (USER_ROLE === 'admin')
      return filter ? adoption.status === filter : true;
    return adoption.user._id === USER_ID;
  });

  adoptionContainer.innerHTML = '';

  if (filteredAdoptions.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent =
      'No hay adopciones disponibles para este filtro.';
    emptyMessage.classList.add('empty-message');
    adoptionContainer.appendChild(emptyMessage);
  } else {
    for (const adoption of filteredAdoptions) {
      const petData = {
        name: adoption.pet.name,
        imageUrl: adoption.pet.imageUrl,
        chip: adoption.pet.chip || 'No disponible',
        age: adoption.pet.age || 'Desconocida',
        sexo: adoption.pet.sexo,
        size: adoption.pet.size || 'No definido',
        type: adoption.pet.type,
        showFavorite: false,
        showAdoptButton: false
      };

      const card = await createCard(petData);
      hideLoader();
      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('button-container');

      if (USER_ROLE === 'admin') {
        ['Pending', 'Approved', 'Rejected'].forEach((status) => {
          const button = document.createElement('button');
          button.textContent = status;
          button.classList.add('status-btn', status.toLowerCase() + '-btn');
          if (adoption.status === status) {
            button.classList.add('disabled-btn');
            button.disabled = true;
          } else {
            button.addEventListener('click', async () => {
              await updateAdoption(adoption._id, status);
              AdoptionList(filter);
            });
          }
          buttonContainer.appendChild(button);
        });
      } else {
        const statusText = document.createElement('p');
        statusText.textContent = `Estado: ${adoption.status}`;
        statusText.classList.add(
          'adoption-status',
          adoption.status.toLowerCase() + '-status'
        );
        buttonContainer.appendChild(statusText);

        if (adoption.status === 'Pending') {
          const cancelButton = document.createElement('button');
          cancelButton.textContent = 'Cancelar solicitud';
          cancelButton.classList.add('cancel-adoption-btn');
          cancelButton.addEventListener('click', async () => {
            await deleteAdoption(adoption._id);
            AdoptionList();
          });
          buttonContainer.appendChild(cancelButton);
        }
      }

      card.appendChild(buttonContainer);
      adoptionContainer.appendChild(card);
    }
  }

  main.append(container);
};
