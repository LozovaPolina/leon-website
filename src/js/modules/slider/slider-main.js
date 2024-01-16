import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(container, btns, slides) {
        super(container, btns, slides);
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        } else if (n < 1) {
            this.slideIndex = this.slides.length;
        }
        try {
            this.hanson.style.opacity = '0';
            if (n === 3) {
                this.hanson.classList.add("animated");
                setTimeout(() => {
                    this.hanson.classList.add('fadeInUp')
                }, 1500);
            } else {
                this.hanson.classList.remove('fadeInUp')
            }
        } catch (e) { }

        this.slides.forEach(slide => {
            slide.style.display = 'none'
        });
        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    render() {
        try {
            this.hanson = document.querySelector('.hanson');
        } catch (e) { }
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.plusSlides(1);
            });
        });
        this.backBtn.forEach(item => {
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