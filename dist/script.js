/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/difference.js":
/*!**************************************!*\
  !*** ./src/js/modules/difference.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Difference)
/* harmony export */ });
class Difference {
  constructor(oldOfficer, newOfficer, items) {
    this.oldOfficer = document.querySelector(oldOfficer);
    this.newOfficer = document.querySelector(newOfficer);
    this.items = items;
  }
  hideItems(perentSelector, childItems) {
    perentSelector.querySelectorAll(childItems).forEach((item, i, arr) => {
      if (i !== arr.length - 1) {
        item.style.display = 'none';
      }
    });
  }
  bindTriggers(perentSelector, childItems) {
    let counter = 0;
    perentSelector.querySelector('.plus').addEventListener('click', () => {
      counter += 1;
      this.selector = perentSelector.querySelectorAll(childItems);
      if (counter < this.selector.length) {
        this.selector[counter - 1].classList.add('animated', 'fadeIn');
        this.selector[counter - 1].style.display = 'flex';
      }
      if (counter == this.selector.length - 1) {
        this.selector[counter].classList.add('animated', 'fadeOut');
        this.selector[counter].style.display = 'none';
      }
    });
  }
  init() {
    try {
      this.hideItems(this.oldOfficer, this.items);
      this.hideItems(this.newOfficer, this.items);
      this.bindTriggers(this.oldOfficer, this.items);
      this.bindTriggers(this.newOfficer, this.items);
    } catch (e) {}
  }
}

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Forms)
/* harmony export */ });
class Forms {
  constructor(formSelector) {
    this.message = {
      loading: 'Загрузка',
      success: 'Спасибо! Скоро мы с Вами свяжемся',
      failure: 'Что-то пошло не так...',
      spinner: 'assets/img/spinner.gif',
      ok: 'assets/img/ok.png',
      fail: 'assets/img/fail.png'
    };
    this.path = {
      question: 'assets/question.php'
    };
    this.forms = document.querySelectorAll(formSelector);
    this.phoneInput = document.querySelectorAll('[name="phone"]');
  }
  setForm() {
    this.forms.forEach(form => {
      const formInputs = form.querySelectorAll('input');
      this.checkInputsState(form, formInputs);
      formInputs.forEach(input => {
        input.addEventListener('change', () => {
          this.checkInputsState(form, formInputs);
        });
      });
      form.addEventListener('submit', e => {
        e.preventDefault();
        let statusMessege = document.createElement('div');
        statusMessege.classList.add('status');
        form.parentNode.append(statusMessege);
        form.classList.add('animated', 'fadeOutUp');
        setTimeout(() => {
          form.style.display = 'none';
        }, 400);
        let statusImg = document.createElement('img');
        statusImg.setAttribute('src', this.message.spinner);
        statusImg.classList.add('animated', 'fadeInUp');
        statusMessege.append(statusImg);
        let textMessage = document.createElement('div');
        textMessage.textContent = this.message.loading;
        statusMessege.append(textMessage);
        const formData = new FormData(form);
        this.postData(this.path.question, formData).then(res => {
          console.log(res);
          statusImg.setAttribute('src', this.message.ok);
          textMessage.textContent = this.message.success;
        }).catch(() => {
          statusImg.setAttribute('src', this.message.fail);
          textMessage.textContent = this.message.failure;
        }).finally(() => {
          this.clearInputs(form, formInputs);
          setTimeout(() => {
            statusMessege.remove();
            form.style.display = 'block';
            form.classList.remove('fadeOutUp');
            form.classList.add('fadeInUp');
          }, 6000);
        });
      });
    });
  }
  async postData(url, data) {
    let res = await fetch(url, {
      method: 'POST',
      body: data
    });
    return await res.text();
  }
  mask() {
    let setCursorPosition = (pos, elem) => {
      elem.focus();
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    };
    function createMask(event) {
      let matrix = '+1 (___) ____-___',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');
      if (def.length >= val.length) {
        val = def;
      }
      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
      });
      if (event.type === 'blur') {
        if (this.value.length == 4) {
          this.value = '';
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }
    this.phoneInput.forEach(input => {
      input.addEventListener('input', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
      input.addEventListener('keypress', createMask);
    });
  }
  checkMailInputs() {
    const mailInputs = document.querySelectorAll('[type="email"]');
    mailInputs.forEach(input => {
      input.addEventListener('keypress', e => {
        if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
          e.preventDefault();
        }
      });
      input.addEventListener('input', () => {
        input.value = input.value.replace(/[^a-z 0-9 @ \.]/ig, '');
      });
    });
  }
  checkInputsState(form, formInput) {
    const formBtn = form.querySelector('button');
    const arr = [];
    formInput.forEach(input => {
      input.value.trim() !== '' ? arr.push(true) : arr.push(false);
    });
    if (arr.some(item => item === false)) {
      formBtn.setAttribute('disabled', true);
    } else {
      formBtn.removeAttribute('disabled');
    }
  }
  checkInputsEmptyWarning() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('change', () => {
        if (input.value.trim() === '') {
          input.style.border = '1px solid red';
          input.placeholder = 'please add text';
        } else {
          input.placeholder = '';
          input.style.border = '';
        }
      });
    });
  }
  clearInputs(form, formInputs) {
    formInputs.forEach(item => {
      item.value = '';
    });
    this.checkInputsState(form, formInputs);
  }
  init() {
    this.setForm();
    this.mask();
    this.checkMailInputs();
    this.checkInputsEmptyWarning();
  }
}

/***/ }),

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
  constructor(container, btns, slides, nextPage, prevPage) {
    super(container, btns, slides, nextPage, prevPage);
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
  bindTriggers() {
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
    try {
      const bindListener = (btn, i) => {
        btn.forEach(item => {
          item.addEventListener('click', e => {
            e.stopPropagation();
            e.preventDefault();
            this.plusSlides(i);
          });
        });
      };
      bindListener(this.prevPage, -1);
      bindListener(this.nextPage, 1);
    } catch (e) {}
  }
  render() {
    if (this.container) {
      try {
        this.hanson = document.querySelector('.hanson');
      } catch (e) {}
      this.bindTriggers();
      this.showSlides(this.slideIndex);
    }
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
        data - logo;
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
    } catch (e) {}
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
    autoplay = false,
    prevPage = null,
    nextPage = null
  } = {}) {
    this.container = document.querySelector(container);
    this.inner = document.querySelector(inner);
    try {
      this.slides = this.container.querySelectorAll(slides);
    } catch (e) {}
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
/* harmony import */ var _modules_difference__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/difference */ "./src/js/modules/difference.js");
/* harmony import */ var _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider/slider-main */ "./src/js/modules/slider/slider-main.js");
/* harmony import */ var _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider/slider-mini */ "./src/js/modules/slider/slider-mini.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");





window.addEventListener('DOMContentLoaded', () => {
  const player = new _modules_playVideo__WEBPACK_IMPORTED_MODULE_0__["default"]('.showup .play', '.overlay');
  player.init();
  const slider = new _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: '.page',
    btns: '.next',
    backBtn: '[data-logo]',
    slides: '[data-slide]'
  });
  slider.render();
  const modulePage = new _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: '.moduleapp',
    btns: '.next',
    backBtn: '[data-logo]',
    slides: '.module',
    prevPage: '.prevmodule',
    nextPage: '.nextmodule'
  });
  modulePage.render();
  const showUpSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_3__["default"]({
    inner: '.showup__content-inner',
    container: '.showup__content-slider',
    next: '.showup__next',
    prev: '.showup__prev',
    slides: '.card',
    activeClass: 'card-active',
    animate: true
  });
  showUpSlider.init();
  const modulesSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_3__["default"]({
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
  const feedSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_3__["default"]({
    inner: '.feed__content-inner',
    container: '.feed__slider',
    next: '.feed__slider .slick-next',
    prev: '.feed__slider .slick-prev',
    slides: '.feed__item',
    activeClass: 'feed__item-active'
  });
  feedSlider.init();
  new _modules_difference__WEBPACK_IMPORTED_MODULE_1__["default"]('.officerold', '.officernew', '.officer__card-item').init();
  new _modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"]('.form').init();
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map