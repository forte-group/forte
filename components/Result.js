export default function createResult(root) {

    return ({ result, currentStreak, longestStreak, end }) => { // need to pass in end
        root.classList.add('hidden');
        if (end) root.classList.remove('hidden');
        root.innerHTML = '';
        const h2result = document.createElement('h2');
        h2result.classList.add('result-title');
        if (result === 1) {
            h2result.textContent = 'You won!';
        }
        else {
            h2result.textContent = 'You Lost!';
        }

        const currentDiv = document.createElement('div');
        currentDiv.classList.add('streak-div');

        const h3Current = document.createElement('h3');
        const currentStreakSpan = document.createElement('span');
        h3Current.textContent = 'Current Streak: ';
        currentStreakSpan.textContent = currentStreak;

        currentDiv.append(h3Current, currentStreakSpan);

        const longestDiv = document.createElement('div');
        longestDiv.classList.add('streak-div');

        const h3Longest = document.createElement('h3');
        const longestStreakSpan = document.createElement('span');
        h3Longest.textContent = 'Longest Streak: ';
        longestStreakSpan.textContent = longestStreak;

        longestDiv.append(h3Longest, longestStreakSpan);

        const linkDiv = document.createElement('div');
        linkDiv.classList.add('link-div');

        const playAgainLink = document.createElement('a');
        playAgainLink.href = '/';
        playAgainLink.textContent = 'Play Again!';

        const leaderBoardLink = document.createElement('a');
        leaderBoardLink.href = '../leaderboard';
        leaderBoardLink.textContent = 'View Leaderboard';

        linkDiv.append(playAgainLink, leaderBoardLink);

        root.append(h2result, currentDiv, longestDiv, linkDiv);
    };
}