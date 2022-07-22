//imports
import { getProfile, getUser, signOut, updateProfile, uploadAvatar } from '../services/auth-service.js';
import createUser from '../components/User.js';
import createUpsertProfile from '../components/upsertProfile.js';
import createNavBar from '../components/Nav.js';
import { protectPage } from '../utils.js';


//state
let user = null;
let profile = null;
let menuOpen = false;

//hamburger menu js

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
const NavBar = createNavBar(document, { handleMenuToggle, handleSignOut });
const UpsertProfile = createUpsertProfile(document.querySelector('.profile-form'), handleUpsertProfile);

function display() {
    User({ user, profile });
    NavBar({ menuOpen });
    UpsertProfile({ profile: profile });
}

handlePageLoad();