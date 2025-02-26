// adoptionService.js
const API_URL = 'http://localhost:3000/api/v1/adoptions';
const TOKEN = localStorage.getItem('token');

export const fetchAdoptions = async () => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching adoptions:', error);
    return [];
  }
};

export const fetchUserAdoptions = async (userid) => {
  try {
    const response = await fetch(`${API_URL}/getUserAdoptions/${userId}'`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching adoptions:', error);
    return [];
  }
};

export const updateAdoption = async (adoptionId, newStatus) => {
  try {
    const response = await fetch(`${API_URL}/${adoptionId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      },
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
    const response = await fetch(`${API_URL}/${adoptionId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    return response.ok;
  } catch (error) {
    console.error('Error deleting adoption:', error);
    return false;
  }
};
