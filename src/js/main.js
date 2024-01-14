import Slider from "./modules/slider";

window.addEventListener('DOMContentLoaded', () => {
    const slider = new Slider('.page', '.next', '[data-logo]');
    slider.render();
    
});