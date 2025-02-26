import { Adoption } from '../../pages/Adoption/Adoption';
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
    path: '/Login',
    name: 'Login',
    page: LoginRegister
  }
];
