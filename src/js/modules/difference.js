export default class Difference {
    constructor(oldOfficer,newOfficer,items) {
        this.oldOfficer = document.querySelector(oldOfficer);
        this.newOfficer = document.querySelector(newOfficer);
        this.items = items;
    }
    hideItems(perentSelector,childItems) {
        perentSelector.querySelectorAll(childItems).forEach((item,i,arr) => {
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