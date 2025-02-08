import './tracker.css';

declare global {
  interface Window {
    trackerAPI: any;
  }
}

const eye = document.getElementById('eye');

eye.addEventListener('click', (): void => {
  window.trackerAPI.eyeClick();
});
