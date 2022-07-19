export default function createBackspace(button, { handleBackspace }) {
    button.addEventListener('click', () => {
        handleBackspace();
    });
    return () => {

    };
}