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
    this.hideItems(this.oldOfficer, this.items);
    this.hideItems(this.newOfficer, this.items);
    this.bindTriggers(this.oldOfficer, this.items);
    this.bindTriggers(this.newOfficer, this.items);
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
  constructor({
    formSelector,
    submitButton
  }) {
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
    this.submitButton = document.querySelectorAll(`${formSelector} ${submitButton}`);
  }
  setForm() {
    this.forms.forEach(form => {
      form.addEventListener('submit', e => {
        console.log(e.target);
        e.preventDefault();
        let statusMessege = document.createElement('div');
        statusMessege.classList.add('status');
        form.parentNode.append(statusMessege);
        form.classList.add('animated', 'fadeOutUp');
        setTimeout(() => {
          form.style.display = 'none';
        }, 400);
        let statusImg = document.createElement('img');
        statusImg.setAttribute('src', message.spinner);
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
          form.reset();
          setTimeout(() => {
            statusMessege.remove();
            form.style.display = 'block';
            form.classList.remove('fadeOutUp');
            form.classList.add('fadeInUp');
            // windowClose();
          }, 3000);
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
}

// function buttonToggleDisable(button, boolean) {
//     const btn = document.querySelector(button);

//     if (boolean) {
//         btn.setAttribute('disabled', boolean);
//     } else {
//         btn.removeAttribute('disabled');
//     }
// }

// const forms = () => {

//     const form = document.querySelectorAll('form'),
//         inputs = document.querySelectorAll('input'),
//         upload = document.querySelectorAll('[name="upload"]');

//     const message = {
//         loading: 'Загрузка',
//         success: 'Спасибо! Скоро мы с Вами свяжемся',
//         failure: 'Что-то пошло не так...',
//         spinner: 'assets/img/spinner.gif',
//         ok: 'assets/img/ok.png',
//         fail: 'assets/img/fail.png'
//     };

//     const path = {
//         disiner: 'assets/server.php',
//         question: 'assets/question.php'
//     };

//     form.forEach(item => {

//         item.addEventListener('submit', (e) => {

//             e.preventDefault();

//             let statusMessege = document.createElement('div');
//             statusMessege.classList.add('status');
//             item.parentNode.append(statusMessege);
//             item.classList.add('animated', 'fadeOutUp');

//             setTimeout(() => {
//                 item.style.display = 'none';
//             }, 400);

//             let statusImg = document.createElement('img');
//             statusImg.setAttribute('src', message.spinner);
//             statusImg.classList.add('animated', 'fadeInUp');
//             statusMessege.append(statusImg);

//             let textMessage = document.createElement('div');
//             textMessage.textContent = message.loading;
//             statusMessege.append(textMessage);

//             const formData = new FormData(item);

//             let api;
//             item.closest('.popup-design') || item.matches('.calc_form') ? api = path.disiner : api = path.question;
//             console.log(api);

//             if (item.matches('.calc_form')) {
//                 for (let key in calcObj) {
//                     formData.append(key, calcObj[key])
//                     delete calcObj[key];
//                 }

//                 console.log(formData);

//                 document.querySelector('.calc-price').textContent = `
//                     Для расчета нужно выбрать размер картины и материал картины
//                 `
//                 buttonToggleDisable('.calc_form .button-order', true);
//             }

//             postData(api, formData)
//                 .then(res => {
//                     console.log(res);
//                     statusImg.setAttribute('src', message.ok);
//                     textMessage.textContent = message.success;
//                 })
//                 .catch(() => {
//                     statusImg.setAttribute('src', message.fail);
//                     textMessage.textContent = message.failure;
//                 })
//                 .finally(() => {
//                     item.reset();
//                     setTimeout(() => {
//                         upload.forEach(item => {
//                             item.previousElementSibling.textContent = 'Файл не выбран';
//                         })
//                         statusMessege.remove();
//                         item.style.display = 'block';
//                         item.classList.remove('fadeOutUp');
//                         item.classList.add('fadeInUp');
//                         windowClose();
//                     }, 3000);

//                 });
//         });
//     });

//     buttonToggleDisable('.calc_form .button-order', true);
// };

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
  const forms = new _modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"]('form', 'form .btn');
  forms.setForm();
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map