import './Button.css';

export const Button = (text) => {
  const button = document.createElement('button');
  button.classList.add('adopt-btn');
  button.textContent = text;

  return button;
};
