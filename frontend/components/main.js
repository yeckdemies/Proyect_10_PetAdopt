
const main = document.createElement('main');

main.innerHTML = `
    <div class="logo">
        <img src="assets/logo.png" alt="AdoptaPet">
      </div>
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Adoptar</a></li>
          <li><a href="#">Sobre Nosotros</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </nav>
      <button class="menu-toggle" id="menu-toggle">☰</button>`;

export default main;
