export default class Forms {
    constructor(formSelector) {
        this.message = {
            loading: 'Загрузка',
            success: 'Спасибо! Скоро мы с Вами свяжемся',
            failure: 'Что-то пошло не так...',
            spinner: 'assets/img/spinner.gif',
            ok: 'assets/img/ok.png',
            fail: 'assets/img/fail.png'
        };
        this.path = { question: 'assets/question.php' };
        this.forms = document.querySelectorAll(formSelector);
        this.phoneInput = document.querySelectorAll('[name="phone"]');
    }

    setForm() {
        this.forms.forEach(form => {
            const formInputs = form.querySelectorAll('input')
            this.checkInputsState(form, formInputs);
            formInputs.forEach(input => {
                input.addEventListener('change', () => {
                    this.checkInputsState(form, formInputs);
                });
            });
            
            form.addEventListener('submit', (e) => {
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
                

                this.postData(this.path.question, formData)
                    .then(res => {
                        console.log(res);
                        statusImg.setAttribute('src', this.message.ok);
                        textMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusImg.setAttribute('src', this.message.fail);
                        textMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs(form, formInputs) 
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
            input.addEventListener('keypress', (e) => {
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
            });
            input.addEventListener('input', () => {
                input.value = input.value.replace(/[^a-z 0-9 @ \.]/ig, '')
            });
        });
    }

    checkInputsState(form, formInput) {
        const formBtn = form.querySelector('button')
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
        inputs.forEach((input) => {
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
    clearInputs(form,formInputs) {
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

