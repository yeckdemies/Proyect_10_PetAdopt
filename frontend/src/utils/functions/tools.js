import { routes } from '../routes/routes';

export const navigate = (e, route) => {
  e.preventDefault();
  window.history.pushState('', '', route.path);
  route.page();
};

export const validateUser = async () => {
  const token = localStorage.getItem('token');

  if (!token) return null;

  try {
    const response = await fetch('http://localhost:3000/api/v1/users/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Token inválido');
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error(error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return null;
  }
};

export const cerrarFormulario = () => {
  const loginOverlay = document.querySelector('.login-overlay');
  if (loginOverlay) {
    loginOverlay.remove();
  }
  navigate({ preventDefault: () => {} }, routes[0]);
};
