export default class Slider {
    constructor(page, btns, target) {
        this.page = document.querySelector(page);
        this.slides = this.page.querySelectorAll('[data-slide]');
        this.btns = document.querySelectorAll(btns);
        this.slideIndex = 1;
        this.target = document.querySelectorAll(target);
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        } else if (n < 1) {
            this.slideIndex = this.slides.length;
        }
        this.slides.forEach(slide => {
            slide.style.display = 'none'
        });
        this.slides[this.slideIndex - 1].style.display = 'block';

    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }


    render() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.plusSlides(1);
            });
        });
        this.target.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                if (e.target.parentNode.nodeName == "A" || e.target.parentNode.nodeName == "svg") {
                    this.plusSlides(1);
                    this.slideIndex = 1;
                    this.showSlides(this.slideIndex);
                }
            });
        });

        this.showSlides(this.slideIndex);

    }
}