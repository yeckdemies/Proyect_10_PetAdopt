import { Adoption } from '../../pages/Adoption/Adoption';
import { Favourite } from '../../pages/Favourite/Favourite';
import { LoginRegister } from '../../pages/Login/LoginRegister';
import { Pets } from '../../pages/Pets/Pets';

export const routes = [
  {
    path: '/Pets',
    name: 'Animales',
    page: Pets
  },
  {
    path: '/Adoption',
    name: 'Adopciones',
    page: Adoption
  },
  {
    path: '/Favourite',
    name: 'Favoritos',
    page: Favourite
  },
  {
    path: '/Login',
    name: 'Login',
    page: LoginRegister
  }
];
