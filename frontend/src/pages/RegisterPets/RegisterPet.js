import { PetForm } from '../../components/PetForm/PetForm';
import { registerPet } from '../../api/petsService';
import { routes } from '../../utils/routes/routes';
import { navigate } from '../../utils/functions/tools';

export const RegisterPet = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const handleSubmit = async (formData) => {
    const result = await registerPet(formData);
    if (result) {
      alert('Mascota registrada correctamente');
      navigate(
        { preventDefault: () => {} },
        routes.find((route) => route.name === 'Animales')
      );
    } else {
      alert('Hubo un error al registrar la mascota');
    }
  };

  const petForm = PetForm({ mode: 'register', onSubmit: handleSubmit });
  main.appendChild(petForm);
};
