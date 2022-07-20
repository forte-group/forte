import { synth } from '../app.js';

export default function createSequence(root) {
    
    const sequenceSection = root.querySelector('#sequence');
    let buttons;
    setTimeout(() => {
        buttons = root.querySelectorAll('button');
    }, 500);
    const playButton = sequenceSection.querySelector('button');
    const sequenceDisplay = sequenceSection.querySelector('#sequence-display');

    return ({ sequence }) => {
        sequenceDisplay.innerHTML = '';

        for (let i = 0; i < sequence.length; i++) {
            sequenceDisplay.append(SequenceNote());
        }

        sequenceSection.append(sequenceDisplay);

        playButton.addEventListener('click', () => {
            const now = Tone.now();
            for (let i = 0; i < sequence.length; i++) {
                synth.triggerAttackRelease(sequence[i], '8n', now + (i * 0.5));
            }

            buttons.forEach(button => {
                button.disabled = true;
                setTimeout(() => {
                    button.disabled = false;
                }, 4500);
            });

            const sequenceDivs = sequenceSection.querySelectorAll('.sequence-div');
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