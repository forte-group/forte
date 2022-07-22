export default function createBackspace(button, { handleBackspace }) {
    button.addEventListener('click', () => {
        handleBackspace();
    });
    return ({ currentGuess }) => {
        button.disabled = currentGuess.length === 0;
    };
}