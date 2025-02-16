
const template = () => `
  <section id="pets">
    <ul id="petscontainer">
    </ul>
  </section>
`;

const getPets = async () => {
  const petsData = await fetch("http://localhost:3000/api/v1/pets/getAvailablePets/");
   
  const petsResponse = await petsData.json();


  if (!petsResponse || !petsResponse.availablePets) {
    throw new Error("Invalid API response: availablePets is missing");
  }

  const pets = petsResponse.availablePets;

  console.log("Pets Array:", pets);

  const petsContainer = document.querySelector("#petscontainer");

  petsContainer.innerHTML = ""; 

  for (const pet of pets) {
    
    const li = document.createElement("li");
    li.innerHTML = `
        <img src=${pet.imageUrl} alt=${pet.name}>
        <h3>Nombre: ${pet.name}</h3>
        <h4>Chip: ${pet.chip}</h4>
        <h5>Edad: ${pet.age}</h5>
        <h5>Sexo: ${pet.sexo}</h5>
        <h5>Tamaño: ${pet.size}</h5>
    `;
    petsContainer.appendChild(li);
  }
};

const Pets = () => {
  document.querySelector("main").innerHTML = template();
  getPets();
};

export default Pets;
