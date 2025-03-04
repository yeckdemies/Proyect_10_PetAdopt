import './style.css';
import { Header } from './src/components/Header/Header';
import { Pets } from './src/pages/Pets/Pets';
import { Main } from './src/components/Main/Main';
import { hideLoader, showLoader } from './src/components/Loader/Loader';

const initApp = async () => {
  showLoader();
  await Header();
  Main();
  Pets();
  hideLoader();
};

initApp();
