// adoptionService.js
const API_URL = 'http://localhost:3000/api/v1/adoptions';
const TOKEN = localStorage.getItem('token');
const HEADER = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json'
};

export const fetchAdoptions = async () => {
  try {
    const response = await fetch(API_URL, {
      headers: HEADER
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching adoptions:', error);
    return [];
  }
};

export const updateAdoption = async (adoptionId, newStatus) => {
  try {
    const response = await fetch(`${API_URL}/editAdoption/${adoptionId}`, {
      method: 'PUT',
      headers: HEADER,
      body: JSON.stringify({ status: newStatus })
    });
    return response.ok;
  } catch (error) {
    console.error('Error updating adoption:', error);
    return false;
  }
};

export const deleteAdoption = async (adoptionId) => {
  try {
    const response = await fetch(`${API_URL}/deleteAdoption/${adoptionId}`, {
      method: 'DELETE',
      headers: HEADER
    });
    return response.ok;
  } catch (error) {
    console.error('Error deleting adoption:', error);
    return false;
  }
};
