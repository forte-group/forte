import { getUser, signOut, getProfile } from '../services/auth-service.js';
import { protectPage } from '../utils.js';
import createUser from '../components/User.js';
import { getLongestStreaks } from '../services/forte-service.js';
import createLeaderboard from '../components/Leaderboard.js';

// State
let user = null;
let profile = null;
let streaks = [];

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    profile = await getProfile();
    if (profile.avatar_url === null) {
        profile.avatar_url = 'https://vzknktjrbugxtqzlomdz.supabase.co/storage/v1/object/public/avatars/f7d0a9e4-b59d-41a4-8f0b-a1ea8286f40c/musician-removebg-preview.png';
    }

    streaks = await getLongestStreaks();

    display();
}

async function handleSignOut() {
    signOut();
}

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const Leaderboard = createLeaderboard(document.querySelector('#scores'));

function display() {
    User({ user, profile });
    Leaderboard({ streaks });

}

handlePageLoad();
