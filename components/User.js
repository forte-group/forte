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


        root.append(userDisplay);
    };
}

