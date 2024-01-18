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
        autoplay = false,
        prevPage = null,
        nextPage = null
    } = {}) {
        this.container = document.querySelector(container);
        this.inner = document.querySelector(inner);
        try {this.slides = this.container.querySelectorAll(slides);} catch(e){}
        this.btns = document.querySelectorAll(btns);
        this.slideIndex = 1;
        this.backBtn = document.querySelectorAll(backBtn);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.prevPage = document.querySelectorAll(prevPage);
        this.nextPage = document.querySelectorAll(nextPage);
        this.offset = 0;
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
    }
}