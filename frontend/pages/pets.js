// Define una arrow function llamada `template` que devuelve un template string.
const template = () => `
  <section id="pets">
    <ul id="petscontainer">
    </ul>
  </section>
`;

// Define una función asíncrona llamada `getBooks` para obtener y mostrar libros desde una API
const getPets = async () => {
  // Realiza una solicitud a la API para obtener datos de libros
  const petsData = await fetch("http://localhost:3000/api/v1/pets/getAvailablePets");
  
  // Convierte los datos a formato JSON
  const pets = await petsData.json();
  
  // Selecciona el contenedor de libros en el DOM
  const petsContainer = document.querySelector("#petscontainer");
  
  // Itera sobre cada libro y crea elementos de lista para mostrar la información
  for (const pet of pets) {
    const li = document.createElement("li");
    li.innerHTML = `
        <img src=${pet.imageurl} alt=${pet.name}/>
        <h3>${pet.name}</h3>
        <h4>${pet.chip}</h4>
        <h5>${pet.age}</h5>
        <h5>${pet.sexo}</h5>
        <h5>${pet.size}</h5>
    `;
    petsContainer.appendChild(li);
  }
};

// Define una función llamada `Books` que actualiza el contenido de la sección de libros en el DOM
const Pets = () => {
  // Selecciona el elemento 'main' en el DOM y asigna el HTML generado por la función `template`
  document.querySelector("main").innerHTML = template();
  
  // Llama a la función `getBooks` para cargar dinámicamente los libros en la página
  getPets();
};

export default Pets;
