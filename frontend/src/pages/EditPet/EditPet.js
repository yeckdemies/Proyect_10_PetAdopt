import { PetForm } from '../../components/PetForm/PetForm';
import { routes } from '../../utils/routes/routes';
import { navigate } from '../../utils/functions/tools';
import { getPetById, updatePet } from '../../api/petsService'; // ✅ Importar updatePet

export const EditPet = async (petId) => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const petData = await getPetById(petId);
  if (!petData) {
    alert('No se encontró la mascota.');
    navigate(
      { preventDefault: () => {} },
      routes.find((route) => route.name === 'Animales')
    );
    return;
  }

  const handleSubmit = async (formData) => {
    const updated = await updatePet(petId, formData);
    if (updated) {
      alert('Mascota actualizada correctamente.');
      navigate(
        { preventDefault: () => {} },
        routes.find((route) => route.name === 'Animales')
      );
    } else {
      alert('Error al actualizar la mascota.');
    }
  };

  const petForm = PetForm({ mode: 'edit', petData, onSubmit: handleSubmit });
  main.appendChild(petForm);
};
