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
            profile_id: userId,
            streakId,
            streak
        })
        .single();

    return checkResponse(response);
}

export async function updateStreak(userId, streakId, streak) {
    const response = await client
        .from('leaderboard')
        .update({
            streak
        })
        .eq('profile_id', userId)
        .eq('streakId', streakId)
        .single();
    
    return checkResponse(response);
}

