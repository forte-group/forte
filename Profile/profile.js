//imports
import { getProfile, getUser, signOut, updateProfile, uploadAvatar } from '../services/auth-service.js';
import createUser from '../components/User.js';
import createUpsertProfile from '../components/upsertProfile.js';
import { protectPage } from '../utils.js';


//state
let user = null;
let profile = null;


//hamburger menu js
let menuOpen = false;

const menu = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.menu-option');
const hamburger = document.querySelector('.hamburger');
const menuIcon = document.querySelector('#display-menu');
const closeIcon = document.querySelector('#close-menu');
const docMain = document.querySelector('main');

function menuToggle() {
    if (menu.classList.contains('showMenu')) {
        menu.classList.remove('showMenu');
        closeIcon.style.display = 'none';
        menuIcon.style.display = 'block';

    }
    else {
        menu.classList.add('showMenu');
        closeIcon.style.display = 'block';
        menuIcon.style.display = 'none';
        menuOpen = true;

    }
}

hamburger.addEventListener('click', menuToggle);

menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', menuToggle);
});

docMain.addEventListener('click', () => {
    if (menuOpen === true) {
        menuToggle();
    }
});

//action handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    if (!user) {
        return;
    }
    profile = await getProfile();
    display();
}

async function handleUpsertProfile({ username, avatar }) {
    let url = '';
    if (avatar.size) {
        url = await uploadAvatar(user.id, avatar);
    }

    const update = {
        id: user.id,
        username: username,
    };

    if (url) update.avatar_url = url;
    profile = await updateProfile(update);

    location.assign('/');
}

async function handleSignOut() {
    await signOut();
}

//components
const User = createUser(document.querySelector('#user'), { handleSignOut });
const UpsertProfile = createUpsertProfile(document.querySelector('.profile-form'), handleUpsertProfile);

function display() {
    User({ user, profile });
    UpsertProfile({ profile: profile });
}

handlePageLoad();