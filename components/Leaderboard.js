export default function createLeaderboard(root) {

    return ({ streaks }) => {
        root.innerHTML = '';
        for (const streak of streaks) {
            root.append(Leader({ streak }));
        }
    };
}

function Leader({ streak }) {
    const li = document.createElement('li');
    li.classList.add('leaderboard-element');

    const leaderDiv = document.createElement('div');
    leaderDiv.classList.add('leader');

    const img = document.createElement('img');
    img.classList.add('avatar');
    const leaderSpan = document.createElement('span');
    leaderSpan.classList.add('leader-name');

    img.src = streak.profiles.avatar_url;
    leaderSpan.textContent = streak.profiles.username;

    const scoreDiv = document.createElement('div');
    scoreDiv.classList.add('score-div');

    const scoreSpan = document.createElement('span');
    scoreSpan.classList.add('score');
    scoreSpan.textContent = streak.streak;

    leaderDiv.append(img, leaderSpan);
    scoreDiv.append(scoreSpan);

    li.append(leaderDiv, scoreDiv);
    return li;
}