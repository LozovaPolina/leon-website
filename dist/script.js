/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/playVideo.js":
/*!*************************************!*\
  !*** ./src/js/modules/playVideo.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VideoPlayer)
/* harmony export */ });
class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector('.close');
  }
  bindTriggers() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (document.querySelector('iframe#frame')) {
          this.overlay.style.display = 'flex';
        } else {
          const path = btn.getAttribute('data-url');
          this.createPlayer(path);
        }
      });
    });
  }
  bindCloseBtn() {
    this.close.addEventListener('click', () => {
      this.overlay.style.display = 'none';
      this.player.stopVideo();
    });
  }
  createPlayer(url) {
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: `${url}`
    });
    console.log(this.player);
    this.overlay.style.display = 'flex';
  }
  init() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    this.bindTriggers();
    this.bindCloseBtn();
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider-main.js":
/*!**********************************************!*\
  !*** ./src/js/modules/slider/slider-main.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MainSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
          this.hanson.classList.add('fadeInUp');
        }, 1500);
      } else {
        this.hanson.classList.remove('fadeInUp');
      }
    } catch (e) {}
    this.slides.forEach(slide => {
      slide.style.display = 'none';
    });
    this.slides[this.slideIndex - 1].style.display = 'block';
  }
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }
  render() {
    try {
      this.hanson = document.querySelector('.hanson');
    } catch (e) {}
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.plusSlides(1);
      });
    });
    this.backBtn.forEach(item => {
      item.addEventListener('click', e => {
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

/***/ }),

/***/ "./src/js/modules/slider/slider-mini.js":
/*!**********************************************!*\
  !*** ./src/js/modules/slider/slider-mini.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MiniSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MiniSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
    };
    this.btnListiner(this.next, 'mouseenter', false);
    this.btnListiner(this.next, 'mouseleave', true);
    this.btnListiner(this.prev, 'mouseenter', false);
    this.btnListiner(this.prev, 'mouseleave', true);
    this.btnListiner(this.slides, 'mouseenter', false);
    this.btnListiner(this.slides, 'mouseleave', true);
  }
  decorizeSlides(i = 0) {
    this.count = i;
    if (this.count == this.slides.length) this.count = 0;
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
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider.js":
/*!*****************************************!*\
  !*** ./src/js/modules/slider/slider.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Slider)
/* harmony export */ });
class Slider {
  constructor({
    inner = null,
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_playVideo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/playVideo */ "./src/js/modules/playVideo.js");
/* harmony import */ var _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/slider/slider-main */ "./src/js/modules/slider/slider-main.js");
/* harmony import */ var _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider/slider-mini */ "./src/js/modules/slider/slider-mini.js");



window.addEventListener('DOMContentLoaded', () => {
  const player = new _modules_playVideo__WEBPACK_IMPORTED_MODULE_0__["default"]('.showup .play', '.overlay');
  player.init();
  const slider = new _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_1__["default"]({
    container: '.page',
    btns: '.next',
    backBtn: '[data-logo]',
    slides: '[data-slide]'
  });
  slider.render();
  const showUpSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__["default"]({
    inner: '.showup__content-inner',
    container: '.showup__content-slider',
    next: '.showup__next',
    prev: '.showup__prev',
    slides: '.card',
    activeClass: 'card-active',
    animate: true
  });
  showUpSlider.init();
  const modulesSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__["default"]({
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
  const feedSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__["default"]({
    inner: '.feed__content-inner',
    container: '.feed__slider',
    next: '.feed__slider .slick-next',
    prev: '.feed__slider .slick-prev',
    slides: '.feed__item',
    activeClass: 'feed__item-active'
  });
  feedSlider.init();
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map