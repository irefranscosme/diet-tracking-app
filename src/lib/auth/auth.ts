import { createSupabaseServer } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export class Auth {
    email?: string;
    password?: string;

    constructor(email?: string, password?: string) {
        this.email = email;
        this.password = password;
    }

    signIn = async (): Promise<void> => {
        try {
            if (!this.email || !this.password) {
                // TODO: Improve error message.
                throw new Error('Email or password must not be blank.');
            }
            // TODO: Supabase login
            const supabase = await createSupabaseServer();

            const data = {
                email: this.email as string,
                password: this.password as string,
            };
            // type-casting here for convenience
            // in practice, you should validate your inputs

            const { error } = await supabase.auth.signInWithPassword(data);

            if (error) {
                redirect('/error');
            }

            // revalidatePath('/', 'layout');
            redirect('/');
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error(e.message);
            }
            console.error('Something went wrong.');
        }
    };
}
