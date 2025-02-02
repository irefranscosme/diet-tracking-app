import { createSupabaseServer } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export class Google {
    signIn = async () => {
        // TODO: google implementation of oauth.
        const supabase = await createSupabaseServer();
        const { data } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
                redirectTo: `http://localhost:3000/auth/callback/`,
            },
        });

        if (data.url) {
            redirect(data.url); // use the redirect API for your server framework
        }
    };
}
