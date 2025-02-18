import Pets from "./pages/pets.js";
import Header from './components/header/header.js';



const app = document.querySelector("#app");




app.innerHTML += Header;


document.querySelector("#petslink").addEventListener("click", (event) => {
    event.preventDefault();
    Pets();
  });

Pets();
