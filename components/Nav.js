//hamburger menu js
export default function createNavBar(root, { handleMenuToggle, handleSignOut }) {
    const menu = root.querySelector('.menu');
    const menuItems = root.querySelectorAll('.menu-option');
    const hamburger = root.querySelector('.hamburger');
    const menuIcon = root.querySelector('#display-menu');
    const closeIcon = root.querySelector('#close-menu');
    const docMain = root.querySelector('main');

    const signOutLink = document.createElement('a');
    signOutLink.textContent = 'Sign out';
    signOutLink.href = '/auth';
    signOutLink.addEventListener('click', async () => {
        await handleSignOut();
    });

    signOutLink.classList.add('menu-option');

    menu.append(signOutLink);


    return ({ menuOpen }) => {
        hamburger.addEventListener('click', (e) => {
            e.stopImmediatePropagation();

            handleMenuToggle(menu, closeIcon, menuIcon);
        });

        menuItems.forEach(menuItem => {
            menuItem.addEventListener('click', (e) => {
                e.stopImmediatePropagation();

                handleMenuToggle(menu, closeIcon, menuIcon);
            });
        });

        docMain.addEventListener('click', () => {

            if (menuOpen === true) {
                handleMenuToggle(menu, closeIcon, menuIcon);
                menuOpen = false;
            }
        });
    };
}