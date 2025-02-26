import './Adoption.css';
import {
  fetchAdoptions,
  updateAdoption,
  deleteAdoption
} from '../../api/adoptionService';

const USER = JSON.parse(localStorage.getItem('user'));
const USER_ROLE = USER?.role;
const USER_ID = USER?._id;

export const Adoption = async () => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const container = document.createElement('section');
  container.id = 'adoptions';

  const ul = document.createElement('ul');
  ul.id = 'adoption-container';

  container.appendChild(ul);

  const adoptions = await fetchAdoptions();

  if (!adoptions || !Array.isArray(adoptions)) {
    console.error('Invalid API response');
    return;
  }

  const adoptionContainer = container.querySelector('#adoption-container');
  adoptionContainer.innerHTML = '';

  for (const adoption of adoptions) {
    if (USER_ROLE !== 'admin' && adoption.user._id !== USER_ID) {
      continue;
    }

    const li = document.createElement('li');
    li.classList.add('adoption-item');

    li.innerHTML = `
      <p><strong>Mascota:</strong> ${adoption.pet.name} (${
      adoption.pet.type
    }, ${adoption.pet.sexo})</p>
      <p><strong>Solicitante:</strong> ${adoption.user.userName} (${
      adoption.user.email
    })</p>
      <p><strong>Fecha de solicitud:</strong> ${new Date(
        adoption.adoptionDate
      ).toLocaleDateString()}</p>
      <p><strong>Estado:</strong> ${adoption.status}</p>
      <p><strong>Comentarios:</strong> ${
        adoption.comments || 'Sin comentarios'
      }</p>
      <div class="status-buttons"></div>
    `;

    const buttonContainer = li.querySelector('.status-buttons');

    if (USER_ROLE === 'admin') {
      ['Pending', 'Approved', 'Rejected'].forEach((status) => {
        const button = document.createElement('button');
        button.textContent = status;
        button.disabled = adoption.status === status;
        button.addEventListener('click', () =>
          handleUpdate(adoption._id, status)
        );
        buttonContainer.appendChild(button);
      });
    } else {
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Cancelar solicitud';
      deleteButton.addEventListener('click', () => handleDelete(adoption._id));
      buttonContainer.appendChild(deleteButton);
    }

    adoptionContainer.append(li);
  }

  main.append(container);
};

const handleUpdate = async (adoptionId, newStatus) => {
  if (await updateAdoption(adoptionId, newStatus)) {
    Adoption();
  }
};

const handleDelete = async (adoptionId) => {
  if (await deleteAdoption(adoptionId)) {
    Adoption();
  }
};
