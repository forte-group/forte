export default function createPaging(root, { handleExpand, handleShrink }) {

    const seeMoreButton = root.querySelector('#see-more-button');
    const seeLessButton = root.querySelector('#see-less-button');

    seeMoreButton.addEventListener('click', () => {
        handleExpand();
    });

    seeLessButton.addEventListener('click', () => {
        handleShrink();
    });

    return ({ length, streakCount }) => {

        length > 10 ? seeLessButton.classList.remove('hidden') : seeLessButton.classList.add('hidden');
        length >= streakCount ? seeMoreButton.classList.add('hidden') : seeMoreButton.classList.remove('hidden');
        
    };
}