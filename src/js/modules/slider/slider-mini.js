import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(inner, container, next, prev, slides, activeClass, animate, autoplay) {
        super(inner, container, next, prev, slides, activeClass, animate, autoplay);
        this.count = 0;
    }
    autoplaySlides() {
        this.autoplayId = setInterval(() => {
            this.next.click();
        }, 5000);
    }
    autoplayState() {
        this.btnListiner = (elem, typeEvent, stateInterval) => {
            if (elem.length) {
                elem.forEach(item => {
                    item.addEventListener(typeEvent, () => {
                        stateInterval ? this.autoplaySlides() : clearInterval(this.autoplayId);
                    });
                });
            } else {
                elem.addEventListener(typeEvent, () => {
                    stateInterval ? this.autoplaySlides() : clearInterval(this.autoplayId);
                }); 
            }
        }
        this.btnListiner(this.next, 'mouseenter', false);
        this.btnListiner(this.next, 'mouseleave', true);
        this.btnListiner(this.prev, 'mouseenter', false);
        this.btnListiner(this.prev, 'mouseleave', true);
        this.btnListiner(this.slides, 'mouseenter', false);
        this.btnListiner(this.slides, 'mouseleave', true);

    }
    decorizeSlides(i = 0) {
        this.count = i;
        if (this.count == this.slides.length ) this.count = 0;
        if (this.count < 0) this.count = this.slides.length - 1;
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });
        if (this.animate) {
            this.slides[this.count].querySelector('.card__title').style.opacity = '1';
            this.slides[this.count].querySelector('.card__controls-arrow').style.opacity = '1';
        }
        this.slides[this.count].classList.add(this.activeClass);
    }

    setSlideWidth() {
        this.inner.style.width = 100 * this.slides.length + '%';
        this.inner.style.display = 'flex';
        this.inner.style.transition = '0.5s all';
        this.width = 0;
        this.slides.forEach(slide => {
            this.width = window.getComputedStyle(slide).width;
            this.width = +this.width.replace(/[\D]/g, '');
            this.width = Math.round(this.width);
        });
    }
    bindTriggers() {
        this.next.addEventListener('click', () => {
            this.count += 1;
            if (this.offset >= this.width * (this.slides.length - 1)) {
                this.offset = 0;
            } else {
                this.offset += this.width + 20;
            }
            this.inner.style.transform = `translateX(-${this.offset}px)`;
            if (this.activeClass) this.decorizeSlides(this.count);
        });
        this.prev.addEventListener('click', () => {
            this.count += -1;
            if (this.offset <= 0) {
                this.offset = this.width * (this.slides.length - 1);
            } else {
                this.offset -= this.width + 20;
                if (this.offset + this.width < this.width + 20) {
                    this.offset = 0;
                }
            }
            this.inner.style.transform = `translateX(-${this.offset}px)`;
            if (this.activeClass) this.decorizeSlides(this.count);
        });
    }

    init() {
        try {
            this.container.style.cssText = `
            overflow: hidden;
            display: flex;
        `;
            this.setSlideWidth();
            if (this.activeClass) this.decorizeSlides(this.count);
            this.bindTriggers();
            if (this.autoplay) {
                this.autoplaySlides();
                this.autoplayState();
            }
        }catch(e){}
    }
}