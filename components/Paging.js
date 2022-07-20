export default function createPaging(root, { handleExpand, handleShrink }) {

    const seeMoreButton = root.querySelector('#see-more-button');
    const seeLessButton = root.querySelector('#see-less-button');

    seeMoreButton.addEventListener('click', () => {
        handleExpand();
    });

    seeLessButton.addEventListener('click', () => {
        handleShrink();
    });

    return ({ length }) => {
        if (length > 10) {
            seeLessButton.classList.remove('hidden');
        }
        else {
            seeLessButton.classList.add('hidden');
        }
    };
}