export const synth = new Tone.Synth().toDestination();

export default function createSequence(root) {

    const playButton = root.querySelector('button');
    const sequenceDisplay = root.querySelector('#sequence-display');

    return ({ sequence }) => {
        sequenceDisplay.innerHTML = '';

        for (let i = 0; i < sequence.length; i++) {
            sequenceDisplay.append(SequenceNote({ i }));
        }

        playButton.addEventListener('click', () => {
            const now = Tone.now();
            for (let i = 0; i < sequence.length; i++) {
                synth.triggerAttackRelease(sequence[i], '8n', now + (i * 0.5));
            }
        });

    };
}

function SequenceNote({ id }) {
    const div = document.createElement('div');
    div.id = id;
    div.classList.add('sequence-div');

    return div;

}