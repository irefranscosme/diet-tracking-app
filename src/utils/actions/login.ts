'use server';

import { OAuth } from '@/lib/auth/oauth';
import { Login } from '@/lib/login';
import { Google } from '@/lib/social/google';

export const loginGoogle = async () => {
    const google = new Google();
    const oauth = new OAuth(google);
    const login = new Login(oauth);
    await login.login();
};
