const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = './components/Header/Header.css';
document.head.appendChild(link);

const Header = document.createElement('div');
Header.innerHTML = `
    <header>
        <div class="logo">
            <a href = "./" ><img src="https://res.cloudinary.com/dszffglcl/image/upload/v1739986326/PetAdopt%20Images/m1b9eaa8bikoc0ouv9ca.png" alt="PetAdopt Logo"></a>
        </div>
        <nav>
            <button class="menu-toggle" aria-label="Toggle Menu">☰</button>
            <ul class="nav-menu">
                <li><a href="#" id="petslink">Inicio</a></li>
                <li><a href="#" id="login-link">Login</a></li>
            </ul>
        </nav>
    </header>
`;

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = Header.querySelector('.menu-toggle');
  const navMenu = Header.querySelector('.nav-menu');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
});

export default Header;
