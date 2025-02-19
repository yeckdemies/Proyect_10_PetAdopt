const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = './components/FavoriteButton/FavoriteButton.css'; // Ruta relativa correcta
document.head.appendChild(link);

const FavoriteButton = (pet) => {
  const button = document.createElement('button');
  button.classList.add('favorite-btn');

  const img = document.createElement('img');
  img.src =
    'https://res.cloudinary.com/dszffglcl/image/upload/v1739991338/PetAdopt%20Images/wgsx0gz1vkqdrsgg84ou.png';
  img.alt = 'Favorito';

  button.appendChild(img);

  button.addEventListener('click', () => {
    if (button.classList.contains('active')) {
      img.src =
        'https://res.cloudinary.com/dszffglcl/image/upload/v1739991338/PetAdopt%20Images/wgsx0gz1vkqdrsgg84ou.png';
      button.classList.remove('active');
      console.log(`Mascota ${pet.name} eliminada de favoritos`);
    } else {
      img.src =
        'https://res.cloudinary.com/dszffglcl/image/upload/v1739991339/PetAdopt%20Images/m41guhgncnvd2wthgwj5.png';
      button.classList.add('active');
      console.log(`Mascota ${pet.name} añadida a favoritos`);
    }
  });

  return button;
};

export default FavoriteButton;
