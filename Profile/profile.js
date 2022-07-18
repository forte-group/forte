//imports
import { getProfile, getUser, signOut } from '../services/auth - service.js';
import createUser from '../components/User.js';
import createUpsertProfile from '../components/upsertProfile.js';

//state
let user = null;
let profiles = [];

//action handlers
async function handlePageLoad() {
    user = getUser();

    profiles = await getProfile();
    display();
}

async function handleUpsertProfile({ username, avatar }) {
    let url = '';
    // more to follow after writing uploadAvatar and updateProfile service functions
}

async function handleSignOut() {
    signOut();
}

//components
const User = createUser(document.querySelector('#user'), { handleSignOut });
const UpsertProfile = createUpsertProfile(document.querySelector('.profile-form'), handleUpsertProfile);

function display() {
    User({ user });

}

handlePageLoad();