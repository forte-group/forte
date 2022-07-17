import { checkResponse, client } from './client.js';

export async function getStreaks() {
    const response = await client
        .from('streaks')
        .select(`*,
            profiles(*)    
        `)
        .order('longest', { ascending: false })
        .limit(10);

    return checkResponse(response);
}