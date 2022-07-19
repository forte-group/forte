import { synth } from '../app.js';

// duration of 8th note = 500 ms

export default function createSequence(root) {

    const playButton = root.querySelector('button');
    const sequenceDisplay = root.querySelector('#sequence-display');

    return ({ sequence }) => {
        sequenceDisplay.innerHTML = '';

        for (let i = 0; i < sequence.length; i++) {
            sequenceDisplay.append(SequenceNote());
        }

        root.append(sequenceDisplay);

        playButton.addEventListener('click', () => {
            const now = Tone.now();
            for (let i = 0; i < sequence.length; i++) {
                synth.triggerAttackRelease(sequence[i], '8n', now + (i * 0.5));
            }
            playButton.disabled = true;
            setTimeout(() => {
                playButton.disabled = false;
            }, 4500);

            const sequenceDivs = root.querySelectorAll('.sequence-div');
            let i = 0;

            function displayAudio() {
                sequenceDivs[i].style.backgroundColor = 'green';                        
                setTimeout(function() {   
                    sequenceDivs[i].style.backgroundColor = 'white';                        
                    i++;                    
                    if (i < 8) {          
                        displayAudio();            
                    }                       
                }, 500);
            }            
            displayAudio(); 
        });

    };
}

function SequenceNote() {
    const div = document.createElement('div');
    div.classList.add('sequence-div');

    return div;

}