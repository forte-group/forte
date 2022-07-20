export default function createScaleSelect(select, { handleScaleSelect }) {

    return ({ scaleNames, scales, notes }) => {
        select.innerHTML = '';

        const choose = document.createElement('option');
        choose.disabled = true;
        choose.selected = true;
        choose.value = '';
        choose.textContent = 'Choose a scale...';
        select.append(choose);

        for (let i = 0; i < scaleNames.length; i++) {
            let scaleName = scaleNames[i];
            select.append(Option({ scaleName, i }));
        }

        select.addEventListener('change', () => {
            handleScaleSelect(select.value);
        });

        if (scales.indexOf(notes) >= 0) {
            select.value = scales.indexOf(notes);
        }
        else {
            select.value = '';
        }
    };
}

function Option({ scaleName, i }) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = scaleName;
    return option;
}