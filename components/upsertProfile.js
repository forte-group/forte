export default function createUpsertProfile(form, handleUpsertProfile) {
    const nameInput = document.querySelector('#username');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formdata = new FormData(form);

        const data = {
            username: formdata.get('username'),
            avatar: formdata.get('avatar_url'),
        };

        handleUpsertProfile(data);
        form.reset();
    });

    const fileInput = document.querySelector('#file-input');
    const previewImage = document.querySelector('.avatar-preview');

    fileInput.addEventListener('change', () => {
        const [file] = fileInput.files;
        previewImage.src = URL.createObjectURL(file);
    });

    return ({ profiles }) => {
        if (profiles) {
            const username = profiles.username;
            const avatar = profiles.avatar_url;

            if (username) nameInput.value = username;
            if (avatar) previewImage.src = avatar_url;
        }
    };

}