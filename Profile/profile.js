//imports
import { getProfile, getUser, signOut, updateProfile, uploadAvatar } from '../services/auth-service.js';
import createUser from '../components/User.js';
import createUpsertProfile from '../components/upsertProfile.js';
import { protectPage } from '../utils.js';


//state
let user = null;
let profile = null;

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