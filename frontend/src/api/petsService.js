const API_URL = 'http://localhost:3000/api/v1/pets';
const TOKEN = localStorage.getItem('token');

const HEADER = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json'
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
