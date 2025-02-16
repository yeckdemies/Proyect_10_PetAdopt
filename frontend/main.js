// Importa el archivo de estilos CSS. 
//import "./src/style.css"; 

import main from "./components/main.js";
import Pets from "./pages/pets.js";

document.querySelector("header").appendChild(main);

document.querySelector("#petslink").addEventListener("click", (event) => {
    event.preventDefault();
    Pets();
  });

Pets();
