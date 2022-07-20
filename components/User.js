export default function createUser(root, { handleSignOut }) {

    return ({ user, profile }) => {

        root.innerHTML = '';
        const nameDisplay = document.createElement('span');
        const avatarDisplay = document.createElement('img');

        if (profile) {
            const avatar = profile.avatar_url;

            const username = profile.username;
            nameDisplay.textContent = username;

            if (avatar) {
                avatarDisplay.src = avatar;
                avatarDisplay.classList.add('avatar');

                nameDisplay.prepend(avatarDisplay);
            }
        }

        if (!profile && user) {
            const username = user?.email.split('@')[0];
            nameDisplay.textContent = username;
        }

        const userDisplay = document.createElement('div');
        userDisplay.id = 'user-display';

        userDisplay.append(avatarDisplay, nameDisplay);

        const signOutLink = document.createElement('a');
        signOutLink.textContent = 'Sign out';
        signOutLink.href = '/auth';
        signOutLink.addEventListener('click', async () => {
            await handleSignOut();
        });

        const updateProfileLink = document.createElement('a');
        updateProfileLink.textContent = 'Update Profile';
        updateProfileLink.href = '../Profile';

        const linkDiv = document.createElement('div');
        linkDiv.id = 'user-links';

        linkDiv.append(updateProfileLink, signOutLink);

        root.append(userDisplay, linkDiv);
    };
}

