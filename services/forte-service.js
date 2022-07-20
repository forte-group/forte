import { checkResponse, client } from './client.js';

export async function getLongestStreaks(length) {
    const response = await client
        .from('profiles')
        .select(`*`)
        .order('longestStreak', { ascending: false })
        .limit(length);

    return checkResponse(response);
}
