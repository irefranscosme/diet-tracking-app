import { createSupabaseServer } from '@/utils/supabase/server';
import { Auth } from './auth/auth';
import { OAuth } from './auth/oauth';

export class Login {
    auth?: Auth | OAuth;

    constructor(auth?: Auth | OAuth) {
        this.auth = auth;
    }

    login = async (): Promise<void> => {
        return this.auth?.signIn();
    };

    logout = async () => {
        const supabase = await createSupabaseServer();
        return await supabase.auth.signOut();
    };
}
