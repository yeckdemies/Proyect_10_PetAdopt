import { PetForm } from '../../components/PetForm/PetForm';
import { registerPet } from '../../api/petsService';
import { routes } from '../../utils/routes/routes';
import { navigate } from '../../utils/functions/tools';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { ShowAlert } from '../../components/Alert/Alert';

export const RegisterPet = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const handleSubmit = async (formData) => {
    const result = await registerPet(formData);
    if (result) {
      ShowAlert('Mascota registrada correctamente.', 'success', 3000, true);
      navigate(
        { preventDefault: () => {} },
        routes.find((route) => route.name === 'Animales')
      );
    } else {
      ShowAlert('Hubo un error al registrar la mascota.', 'error', 3000, true);
    }
  };

  const petForm = PetForm({ mode: 'register', onSubmit: handleSubmit });
  main.appendChild(petForm);
};
