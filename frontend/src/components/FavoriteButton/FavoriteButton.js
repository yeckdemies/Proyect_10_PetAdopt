import {
  addFavorite,
  removeFavorite,
  getCurrentUser
} from '../../api/favoriteService';
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

  button.addEventListener('click', async () => {
    if (button.classList.contains('active')) {
      const result = await removeFavorite(pet._id);
      if (result.success) {
        updateButtonState(false);
        console.log(result.message);
      } else {
        console.error(result.message);
      }
    } else {
      const result = await addFavorite(pet._id);
      if (result.success) {
        updateButtonState(true);
        console.log(result.message);
      } else {
        console.error(result.message);
      }
    }
  });

  return button;
};
