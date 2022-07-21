import { checkResponse, client } from './client.js';

export async function getLongestStreaks(length) {
    const response = await client
        .from('leaderboard')
        .select(`*,
            profiles(*)
        `)
        .order('streak', { ascending: false })
        .limit(length);

    return checkResponse(response);
}

export async function addStreak(streak, streakId, userId) {
    const response = await client
        .from('leaderboard')
        .insert({
            id: userId,
            streakId,
            streak
        })
        .single();

    return checkResponse(response);
}

export async function getMostRecentStreak(userId) {
    const response = await client
        .from('leaderboard')
        .select(`*,
            profiles(*)
        `)
        .eq('id', userId)
        .order('streakId', { ascending: false })
        .limit(1);

    return checkResponse(response);
}

export async function updateStreak(userId, streakId, streak) {
    const response = await client
        .from('leaderboard')
        .upsert({
            id: userId,
            streakId,
            streak
        })
        .eq('id', userId)
        .eq('streakId', streakId)
        .single();
    
    return checkResponse(response);
}

