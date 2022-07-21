//hamburger menu js
let menuOpen = false;

const menu = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.menu-option');
const hamburger = document.querySelector('.hamburger');
const menuIcon = document.querySelector('#display-menu');
const closeIcon = document.querySelector('#close-menu');
const docBod = document.querySelector('body');

function menuToggle() {
    if (menu.classList.contains('showMenu')) {
        menu.classList.remove('showMenu');
        closeIcon.style.display = 'none';
        menuIcon.style.display = 'block';
        console.log('inside if');

    }
    else {
        menu.classList.add('showMenu');
        closeIcon.style.display = 'block';
        menuIcon.style.display = 'none';
        menuOpen = true;
        console.log('inside else');

    }
}

hamburger.addEventListener('click', (e) => {
    e.stopImmediatePropagation();

    menuToggle();
});

menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', (e) => {
        e.stopImmediatePropagation();

        menuToggle();
    });
});

docBod.addEventListener('click', (e) => {
    e.stopImmediatePropagation();

    if (menuOpen === true) {
        menuToggle();
        menuOpen = false;
    }
});