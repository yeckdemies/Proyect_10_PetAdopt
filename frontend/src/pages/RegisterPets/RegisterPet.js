import './RegisterPet.css';
import { routes } from '../../utils/routes/routes';
import { registerPet } from '../../api/petsService';
import { navigate } from '../../utils/functions/tools';
import { hideLoader } from '../../components/Loader/Loader';

export const RegisterPet = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const container = document.createElement('section');
  container.id = 'register-pet';

  const title = document.createElement('h2');
  title.textContent = 'Registrar Nueva Mascota';
  container.appendChild(title);

  const form = document.createElement('form');
  form.id = 'register-pet-form';

  const fields = [
    { name: 'chip', label: 'Chip', type: 'text', required: true },
    { name: 'name', label: 'Nombre', type: 'text', required: true },
    { name: 'age', label: 'Edad', type: 'number', required: true },
    {
      name: 'sexo',
      label: 'Sexo',
      type: 'select',
      options: ['Macho', 'Hembra'],
      required: true
    },
    {
      name: 'size',
      label: 'Tamaño',
      type: 'select',
      options: ['Grande', 'Mediano', 'Pequeño'],
      required: true
    },
    {
      name: 'type',
      label: 'Tipo',
      type: 'select',
      options: ['Perro', 'Gato'],
      required: true
    },
    { name: 'imageUrl', label: 'Imagen', type: 'file', required: true }
  ];

  fields.forEach((field) => {
    const fieldContainer = document.createElement('div');
    fieldContainer.classList.add('form-group');

    const label = document.createElement('label');
    label.textContent = field.label;
    label.setAttribute('for', field.name);

    let input;
    if (field.type === 'select') {
      input = document.createElement('select');
      field.options.forEach((option) => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        input.appendChild(optionElement);
      });
    } else {
      input = document.createElement('input');
      input.type = field.type;
    }

    input.id = field.name;
    input.name = field.name;

    if (field.required) {
      input.setAttribute('required', 'true');
    }

    fieldContainer.appendChild(label);
    fieldContainer.appendChild(input);
    form.appendChild(fieldContainer);
  });

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Registrar Mascota';
  submitButton.type = 'submit';
  submitButton.classList.add('submit-btn');
  form.appendChild(submitButton);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const result = await registerPet(formData);
    hideLoader();
    if (result) {
      alert('Mascota registrada correctamente');
      navigate(
        e,
        routes.find((route) => route.name === 'Animales')
      );
    } else {
      alert('Hubo un error al registrar la mascota');
    }
  });

  container.appendChild(form);
  main.appendChild(container);
};
