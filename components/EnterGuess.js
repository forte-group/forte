export default function createEnterGuess(button, { handleEnterGuess }) {
    
    button.addEventListener('click', () => {
        handleEnterGuess();
    });

    return ({ currentGuess }) => {
        console.log(currentGuess);
        button.disabled = currentGuess.length < 8;
    };
}