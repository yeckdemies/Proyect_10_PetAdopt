// Define una arrow function llamada `template` que devuelve un template string.
const template = () => `
  <section id="books">
    ${
      // Utiliza un ternario para mostrar un mensaje de bienvenida si hay un usuario en el localStorage,
      // de lo contrario, muestra un mensaje para iniciar sesión
      localStorage.getItem('user')
        ? `
        <h3>Welcome User</h3>`
        : `<h3>Please, log in</h3>`
    }
    <ul id="bookscontainer">
    </ul>
  </section>
`;

// Define una función asíncrona llamada `getBooks` para obtener y mostrar libros desde una API
const getBooks = async () => {
  const booksData = await fetch('http://localhost:3000/api/v1/libros');
  const books = await booksData.json();
  const booksContainer = document.querySelector('#bookscontainer');
  for (const book of books) {
    const li = document.createElement('li');
    li.innerHTML = `
    <img src=${book.caratula} alt=${book.titulo}/>
    <h3>${book.titulo}</h3>
    <h4>${book.autor}</h4>
    <h5>${book.valoracion}</h5>
    <h5>${book.precio}€</h5>
    <button class="favorite-btn" data-book-id="${book._id}">❤️</button>
    `;
    booksContainer.appendChild(li);

    // Agrega un evento clic al botón de favoritos.
    const favoriteBtn = li.querySelector('.favorite-btn');
    if (favoriteBtn) {
      favoriteBtn.addEventListener('click', () => {
        const bookId = favoriteBtn.getAttribute('data-book-id');
        handleAddToFavorites(bookId);
      });
    }
  }
};

// Define una función llamada `Books` que actualiza el contenido de la sección de libros en el DOM
const Books = () => {
  // Selecciona el elemento 'main' en el DOM y asigna el HTML generado por la función `template`
  document.querySelector('main').innerHTML = template();

  // Llama a la función `getBooks` para cargar dinámicamente los libros en la página
  getBooks();
};

// Exporta la función `Books` como el valor predeterminado del módulo
export default Books;
