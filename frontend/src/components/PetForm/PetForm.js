import './PetForm.css';
import { routes } from '../../utils/routes/routes';
import { navigate } from '../../utils/functions/tools';

export const PetForm = ({ mode, petData = {}, onSubmit }) => {
  const formContainer = document.createElement('section');
  formContainer.classList.add('pet-form-container');

  const title = document.createElement('h2');
  title.textContent =
    mode === 'edit' ? 'Editar Mascota' : 'Registrar Nueva Mascota';
  formContainer.appendChild(title);

  const form = document.createElement('form');
  form.classList.add('pet-form');

  const fields = [
    {
      name: 'chip',
      label: 'Chip',
      type: 'text',
      required: true,
      disabled: mode === 'edit'
    },
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
    {
      name: 'imageUrl',
      label: 'Imagen',
      type: 'file',
      required: mode === 'register'
    }
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
        if (petData[field.name] === option) {
          optionElement.selected = true;
        }
        input.appendChild(optionElement);
      });
    } else {
      input = document.createElement('input');
      input.type = field.type;

      if (field.type !== 'file' && petData[field.name]) {
        input.value = petData[field.name];
      }
    }

    input.id = field.name;
    input.name = field.name;
    if (field.required) {
      input.setAttribute('required', 'true');
    }
    if (field.disabled) {
      input.setAttribute('disabled', 'true');
    }

    fieldContainer.appendChild(label);
    fieldContainer.appendChild(input);
    form.appendChild(fieldContainer);
  });

  const submitButton = document.createElement('button');
  submitButton.textContent =
    mode === 'edit' ? 'Actualizar Mascota' : 'Registrar Mascota';
  submitButton.type = 'submit';
  submitButton.classList.add('submit-btn');
  form.appendChild(submitButton);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    onSubmit(formData);
  });

  formContainer.appendChild(form);
  return formContainer;
};
