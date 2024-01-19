export default class ShowInfo {
    constructor(btn) {
        this.showBtn = document.querySelectorAll(btn);
    }

    init() {
        this.showBtn.forEach(item => {
            item.addEventListener('click', (e) => {
                const target = e.target;
                if (target.matches('.plus') || target.matches('.plus__content') || target.matches('.plus__content svg') || target.matches('.plus__content svg path')) {
                    const itemSibling = item.nextElementSibling;
                    if (itemSibling.style.display !== 'block') {
                        itemSibling.classList.add('animated', 'fadeIn');
                        itemSibling.classList.remove('fadeOut')
                        itemSibling.style.display = 'block';
                    } else {
                        itemSibling.classList.remove('fadeIn')
                        itemSibling.classList.add('fadeOut');
                        itemSibling.style.display = 'none';
                    }
                }
            });
        })
    };
}


//module__info-show