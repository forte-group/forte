import { client, checkResponse } from './client.js';


export function getUser() {
    return client.auth.user();
}

export async function signUp(email, password) {
    return await client.auth.signUp({ email, password });
}

export async function signIn(email, password) {
    return await client.auth.signIn({ email, password });
}

export async function signOut() {
    return await client.auth.signOut();
}

//find user on profiles table
export async function getProfile() {
    const user = getUser();
    const response = await client.from('profiles').select().eq('id', user.id);

    const rows = checkResponse(response);
    return rows[0] || null;
}

//update user data on the table
export async function updateProfile(profile) {
    const response = await client.from('profiles').upsert(profile).eq('id', profile.id).single();

    return checkResponse(response);
}

//allow user to update profile picture
const BUCKET_NAME = 'forte';

export async function uploadAvatar(userId, imageFile) {
    const imageName = `${userId}/${imageFile.name}`;

    const bucket = client.storage.from(BUCKET_NAME);

    const { data, error } = await bucket.upload(imageName, imageFile, { cacheControl: '3600', upsert: true });

    if (error) {
        //eslint-disable-next-line no-console
        console.log(error);
        return null;
    }

    const url = bucket.getPublicUrl(data.Key.replace(`${BUCKET_NAME}`)).publicURL;

    return url;
}

