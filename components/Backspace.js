export default function createBackspace(button, { goBack }) {
    button.addEventListener('click', () => {
        goBack();
    });
    return () => {

    };
}