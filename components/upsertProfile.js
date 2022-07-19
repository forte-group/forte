export default function createUpsertProfile(form, handleUpsertProfile) {
    const nameInput = document.querySelector('#username');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formdata = new FormData(form);

        const data = {
            username: formdata.get('username'),
            avatar: formdata.get('avatar'),
        };
        // // console.log(data.avatar.name);
        // // if (data.avatar.name === '') {
        // //     data.avatar = 'https://vzknktjrbugxtqzlomdz.supabase.co/storage/v1/object/public/avatars/f7d0a9e4-b59d-41a4-8f0b-a1ea8286f40c/musician-removebg-preview.png';

        // }

        handleUpsertProfile(data);
        form.reset();
    });

    const fileInput = document.querySelector('#file-input');
    const previewImage = document.querySelector('.avatar-preview');


    fileInput.addEventListener('change', () => {
        const [file] = fileInput.files;
        previewImage.src = URL.createObjectURL(file);
    });

    return ({ profile }) => {
        if (profile) {
            const username = profile.username;
            const avatar = profile.avatar_url;

            if (username) nameInput.value = username;
            if (avatar) previewImage.src = avatar;
        }
    };

}