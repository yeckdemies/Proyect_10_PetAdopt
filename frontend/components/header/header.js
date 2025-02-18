const Header = document.createElement("header");

Header.innerHTML = `<header>
    <link rel="stylesheet" href="./header.css">
    <div class="logo">
        <img src="https://res.cloudinary.com/dszffglcl/image/upload/v1739737184/PetAdopt%20Images/wkhcmymplb0pfd6hmu2d.jpg" alt="PetAdopt Logo">
    </div>
    <nav>
        <button class="menu-toggle" aria-label="Toggle Menu">☰</button>
        <ul class="nav-menu">
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Mascotas</a></li>
            <li><a href="#">Cómo Adoptar</a></li>
            <li><a href="#">Sobre Nosotros</a></li>
            <li><a href="#">Contacto</a></li>
        </ul>
    </nav>
</header>`;

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  menuToggle.addEventListener("click", () => {
      if (navMenu.classList.contains("open")) {
          navMenu.style.height = "0";
          setTimeout(() => navMenu.classList.remove("open"), 300);
      } else {
          navMenu.classList.add("open");
          navMenu.style.height = "200px";
      }
  });
});

export default Header;