import { hideLoader, showLoader } from '../components/Loader/Loader';

const API_URL = 'http://localhost:3000/api/v1/pets';
const TOKEN = localStorage.getItem('token');

const HEADER = {
  Authorization: `Bearer ${TOKEN}`
};

export const fetchAvailablePets = async () => {
  try {
    const response = await fetch(`${API_URL}/getAvailablePets/`, {
      headers: HEADER
    });

    if (!response.ok) {
      throw new Error(`Error fetching pets: ${response.statusText}`);
    }

    const data = await response.json();
    return data.availablePets || [];
  } catch (error) {
    console.error('Error fetching available pets:', error);
    return [];
  }
};

export const registerPet = async (formData) => {
  try {
    showLoader();
    const response = await fetch(`${API_URL}/registerPet`, {
      method: 'POST',
      headers: HEADER,
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Error registering pet: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error('Error registrando la mascota:', error);
    return false;
  }
};

export const deletePet = async (petId) => {
  try {
    showLoader();
    const TOKEN = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/deletePet/${petId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error deleting pet: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error eliminando la mascota:', error);
    return false;
  }
};
