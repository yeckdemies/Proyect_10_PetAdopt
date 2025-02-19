const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = './components/Button/Button.css'; // Ruta relativa correcta
document.head.appendChild(link);

const Button = (text) => {
  const button = document.createElement('button');
  button.classList.add('adopt-btn');
  button.textContent = text;
  return button;
};

export default Button;
