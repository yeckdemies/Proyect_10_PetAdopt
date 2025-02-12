// Agrega esta función para manejar el clic en el corazón y llamar a la API para añadir a favoritos.
const handleAddToFavorites = async (bookId) => {
  try {
    const userId = JSON.parse(localStorage.getItem('user')).user._id;
    const token = JSON.parse(localStorage.getItem('user')).token;
    const response = await fetch(
      `http://localhost:3000/api/v1/users/${userId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          favoritos: [bookId] // Puedes ajustar la estructura según tus necesidades.
        })
      }
    );
    console.log(response);
    if (response.ok) {
      // La llamada al backend ha sido exitosa, puedes actualizar la interfaz de usuario o realizar otras acciones necesarias.
      console.log('Libro añadido a favoritos exitosamente');
    } else {
      console.error('Error al añadir libro a favoritos');
    }
  } catch (error) {
    console.error('Error inesperado', error);
  }
};
