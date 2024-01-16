export default class Slider {
    constructor({ inner = null,
        container = null,
        btns = null,
        slides = null,
        backBtn = null,
        next = null,
        prev = null,
        activeClass = null,
        animate = false,
        autoplay = false
    } = {}) {
        this.container = document.querySelector(container);
        this.inner = document.querySelector(inner);
        this.slides = this.container.querySelectorAll(slides);
        this.btns = document.querySelectorAll(btns);
        this.slideIndex = 1;
        this.backBtn = document.querySelectorAll(backBtn);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.offset = 0;
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
    }
}