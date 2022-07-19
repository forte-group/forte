export default function createResult(root) {

    return ({ result, end }) => {
        // root.classList.add('hidden');
        // if (end) root.classList.remove('hidden');
        root.innerHTML = '';
        const resultSpan = document.createElement('span');
        if (result === 1) {
            resultSpan.textContent = 'You won!';
        }
        else {
            resultSpan.textContent = 'You Lost!';
        }
        const playAgainLink = document.createElement('a');
        playAgainLink.href = '/';
        playAgainLink.textContent = 'Play Again!';

        const leaderBoardLink = document.createElement('a');
        leaderBoardLink.href = '../leaderboard';
        leaderBoardLink.textContent = 'View Leaderboard';

        root.append(resultSpan, playAgainLink, leaderBoardLink);
    };
}