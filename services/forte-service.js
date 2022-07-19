import { checkResponse, client } from './client.js';

export async function getLongestStreaks() {
    const response = await client
        .from('profiles')
        .select(`*`)
        .order('longestStreak', { ascending: false })
        .limit(10);

    return checkResponse(response);
}
