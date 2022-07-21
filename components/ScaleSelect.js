export default function createScaleSelect(select, { handleScaleSelect }) {

    return ({ scaleNames, scaleIndex }) => {
        select.innerHTML = '';

        for (let i = 0; i < scaleNames.length; i++) {
            let scaleName = scaleNames[i];
            select.append(Option({ scaleName, i }));
        }

        select.value = scaleIndex;

        select.addEventListener('change', () => {
            handleScaleSelect(select.value);
        });
    };
}

function Option({ scaleName, i }) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = scaleName;
    return option;
}