import {
  addFavorite,
  removeFavorite,
  getCurrentUser
} from '../../api/favoriteService';
import { navigate } from '../../utils/functions/tools';
import { routes } from '../../utils/routes/routes';
import './FavoriteButton.css';

export const FavoriteButton = async (pet) => {
  const button = document.createElement('button');
  button.classList.add('favorite-btn');

  const img = document.createElement('img');
  img.src =
    'https://res.cloudinary.com/dszffglcl/image/upload/v1739991338/PetAdopt%20Images/wgsx0gz1vkqdrsgg84ou.png';
  img.alt = 'Favorito';

  button.appendChild(img);

  const currentUser = await getCurrentUser();

  if (
    currentUser &&
    currentUser.favourites.some((fav) => fav._id === pet._id)
  ) {
    button.classList.add('active');
    img.src =
      'https://res.cloudinary.com/dszffglcl/image/upload/v1739991339/PetAdopt%20Images/m41guhgncnvd2wthgwj5.png';
  }

  const updateButtonState = (isActive) => {
    if (isActive) {
      img.src =
        'https://res.cloudinary.com/dszffglcl/image/upload/v1739991339/PetAdopt%20Images/m41guhgncnvd2wthgwj5.png';
      button.classList.add('active');
    } else {
      img.src =
        'https://res.cloudinary.com/dszffglcl/image/upload/v1739991338/PetAdopt%20Images/wgsx0gz1vkqdrsgg84ou.png';
      button.classList.remove('active');
    }
  };

  button.addEventListener('click', async (e) => {
    e.preventDefault();

    const USER = JSON.parse(localStorage.getItem('user'));
    if (!USER) {
      navigate(
        e,
        routes.find((route) => route.name === 'Login')
      );
      return;
    }

    let result;

    if (button.classList.contains('active')) {
      result = await removeFavorite(pet._id);
    } else {
      result = await addFavorite(pet._id);
    }

    if (result && result.success) {
      updateButtonState(!button.classList.contains('active'));
      console.log(result.message);
    } else {
      console.error(
        result?.message || 'Error desconocido al actualizar favorito.'
      );
    }
  });

  return button;
};
