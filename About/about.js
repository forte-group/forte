//hamburger menu js
import createNavBar from '../components/Nav.js';
import { signOut } from '../services/auth-service.js';

let menuOpen = false;

function handlePageLoad() {
    display();
}

function handleMenuToggle(menu, closeIcon, menuIcon) {
    if (menu.classList.contains('showMenu')) {
        menu.classList.remove('showMenu');
        closeIcon.style.display = 'none';
        menuIcon.style.display = 'block';
        menuOpen = !menuOpen;

    }
    else {
        menu.classList.add('showMenu');
        closeIcon.style.display = 'block';
        menuIcon.style.display = 'none';
        menuOpen = !menuOpen;
    }
    display();
}

async function handleSignOut() {
    await signOut();
}


const NavBar = createNavBar(document, { handleMenuToggle, handleSignOut });

function display() {
    NavBar({ menuOpen });
}

handlePageLoad();