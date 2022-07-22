export default function createResult(root) {

    return ({ result, currentStreak, longestStreak, end, sequence }) => { // need to pass in end
        root.classList.add('hidden');
        if (end) {
            setTimeout(() => {
                root.classList.remove('hidden');
            }, 1500);
        }
        root.innerHTML = '';
        const h2result = document.createElement('h2');
        h2result.classList.add('result-title');
        if (result === 1) {
            h2result.textContent = 'You won!';
        }
        else {
            h2result.textContent = 'You Lost!';
        }

        const h3Sequence = document.createElement('h3');
        h3Sequence.textContent = 'Sequence:';

        const sequenceDiv = document.createElement('div');
        sequenceDiv.id = 'sequence-div';
        for (const note of sequence) {
            const noteSpan = document.createElement('span');
            if (note.includes('5')) {
                noteSpan.textContent = note.split('')[0] + ' (high)';
            }
            else {
                let noteText = note.match(/[a-zA-Z]+/g);
                noteSpan.textContent = noteText[0];
            }
            sequenceDiv.append(noteSpan);
        }
        sequenceDiv.prepend(h3Sequence);

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

        root.append(h2result, sequenceDiv, currentDiv, longestDiv, linkDiv);
    };
}