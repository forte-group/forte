const SUPABASE_URL = 'https://vzknktjrbugxtqzlomdz.supabase.co';
const SUPABASE_KEY =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6a25rdGpyYnVneHRxemxvbWR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTc5MjE5NzQsImV4cCI6MTk3MzQ5Nzk3NH0.GR3I5xx6bOg0tY0fcM1yE3LYix_FTXVA6F1lRBqPhYU';

export const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function checkResponse({ error, data }) {
    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return null;
    }

    return data;
}