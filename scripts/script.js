const burgerMenu = document.querySelector('.burger_menu');
const mobileMenu = document.querySelector('.mobile_menu');

function openMenu() {
    burgerMenu.classList.add('is-open');
    mobileMenu.classList.add('is-open');

}

function closeMenu() {
    burgerMenu.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
}

function toggleMenu() {
    if (mobileMenu.classList.contains('is-open')) {
        closeMenu();
    } else {
        openMenu();
    }
}

burgerMenu.addEventListener('click', function (e) {
    e.stopPropagation(); 
    toggleMenu();
});

const menuLinks = document.querySelectorAll('.mobile_nav__item');
menuLinks.forEach(link => {
    link.addEventListener('click', function () {
        closeMenu();
    });
});

document.addEventListener('click', function (event) {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnBurger = burgerMenu.contains(event.target);

    if (!isClickInsideMenu && !isClickOnBurger && mobileMenu.classList.contains('is-open')) {
        closeMenu();
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMenu();
    }
});
let resizeTimer;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        if (mobileMenu.classList.contains('is-open')) {
            closeMenu();
        }
    }, 250);
});


const swiper = new Swiper('.swiper', {
    slidesPerView: "auto",      
    spaceBetween: 0,      
});

Fancybox.bind('[data-fancybox="gallery"]', {
    infinite: true,  
    Toolbar: {
        display: {
            left: ["infobar"],
            middle: ["zoomIn", "zoomOut", "slideshow"],
            right: ["close"],
        },
    },
});

const form = document.getElementById('form');

const sumRadioinputs = document.querySelectorAll('.sum_radio_input');
const sumCustomInput = document.querySelector('.sum_custom_input');

sumCustomInput.addEventListener('input', function() {
    if (this.value.trim() !== '') {
        sumRadioinputs.forEach(radio => {
            radio.checked = false;
            radio.required = false;

        });
    } else {
         sumRadioinputs.forEach(radio => {
            radio.required = true;

        });
    }
});

sumRadioinputs.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.checked) {
            sumCustomInput.value = '';
        }
        
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const checkedRadio = document.querySelector('.sum_radio_input:checked');
    
    const sum = checkedRadio 
        ? checkedRadio.value 
        : sumCustomInput.value;

    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const msg = form.querySelector('textarea').value;
    const mounthly = form.querySelector('input[name="pay_mouthly"]').checked;
    const anon = form.querySelector('input[name="pay_anon"]').checked; // была пропущена закрывающая скобка
    
    console.log({
        sum: sum || 'Не указана',
        name: name || 'Не указан',
        email: email || 'Не указан',
        msg: msg || 'Не указан',
        mounthly: mounthly,
        anon: anon,
    });
    
     formAlertShow()
    sumCustomInput.value = '';
    sumRadioinputs.forEach(radio => {
        radio.required = false;
        radio.checked = false;
    });
});

const formAlert = document.querySelector('.alert_msg');
function formAlertShow() {
    formAlert.classList.add('is-open');
    setTimeout(() => {
        formAlert.classList.remove('is-open');
    }, 3000);
}


const faqItems = document.querySelectorAll('.faq_item');

faqItems.forEach(item => {
    item.addEventListener('click', function() {
        // Закрываем все остальные блоки
        faqItems.forEach(otherItem => {
            if (otherItem !== this && otherItem.classList.contains('is-open')) {
                otherItem.classList.remove('is-open');
            }
        });
        // Открываем/закрываем текущий
        this.classList.toggle('is-open');
    });
});