import './style.css';
import ProgressBar from './components/progressBar.js';

const app = document.querySelector('#app');

const progress = new ProgressBar(app);

progress.setValue(75);
progress.setAnimated(false);
progress.setHidden(false);