
import VideoPlayer from "./modules/playVideo";
import Difference from "./modules/difference";
import MainSlider from "./modules/slider/slider-main";
import MiniSlider from "./modules/slider/slider-mini";
import Forms from "./modules/forms";


window.addEventListener('DOMContentLoaded', () => {
    const player = new VideoPlayer('.showup .play', '.overlay')
    player.init();


    const slider = new MainSlider({
        container: '.page',
        btns: '.next',
        backBtn: '[data-logo]',
        slides: '[data-slide]'
    });
    slider.render();
    const modulePage = new MainSlider({
        container: '.moduleapp',
        btns: '.next',
        backBtn: '[data-logo]',
        slides: '.module',
        prevPage: '.prevmodule',
        nextPage: '.nextmodule'
    });
    modulePage.render();
    const showUpSlider = new MiniSlider({
        inner: '.showup__content-inner',
        container: '.showup__content-slider',
        next: '.showup__next',
        prev: '.showup__prev',
        slides: '.card',
        activeClass: 'card-active',
        animate: true
    });
    showUpSlider.init();
    const modulesSlider = new MiniSlider({
        inner: '.modules__content-inner',
        container: '.modules__content-slider',
        next: '.modules__info-btns .slick-next',
        prev: '.modules__info-btns .slick-prev',
        slides: '.card',
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    });
    modulesSlider.init();
    const feedSlider = new MiniSlider({
        inner: '.feed__content-inner',
        container: '.feed__slider',
        next: '.feed__slider .slick-next',
        prev: '.feed__slider .slick-prev',
        slides: '.feed__item',
        activeClass: 'feed__item-active',
    });
    feedSlider.init();
    new Difference('.officerold', '.officernew', '.officer__card-item').init();
    new Forms('.form').init();
});