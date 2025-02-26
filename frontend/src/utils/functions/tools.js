import { routes } from '../routes/routes';

export const navigate = (e, route) => {
  e.preventDefault();
  window.history.pushState('', '', route.path);
  route.page();
};



export const cerrarFormulario = () => {
  const loginOverlay = document.querySelector('.login-overlay');
  if (loginOverlay) {
    loginOverlay.remove();
  }
  navigate({ preventDefault: () => {} }, routes[0]);
};
