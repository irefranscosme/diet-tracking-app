'use server';

import { Login } from '@/lib/login';
import { redirect } from 'next/navigation';

export const logout = async () => {
    const login = new Login();
    await login.logout();
    redirect('/');
};
