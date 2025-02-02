'use client';

import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
} from '../ui/form';
import { Input } from '../ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import GoogleAvatar from '../avatars/Google';
import { loginGoogle } from '@/utils/actions/login';

const formSchema = z.object({
    email: z.string(),
    password: z.string(),
});

export const LoginForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onGoogleSignIn = async () => {
        await loginGoogle();
        // form.clearErrors();
        // await new Promise((resolve) => setTimeout(resolve, 3000));
        // console.log(values);
        // router.push(routes.dashboard);
    };

    return (
        <div className="w-full space-y-6 mx-auto">
            <Form {...form}>
                <div className="max-w-2xl mx-auto space-y-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="space-y-0 flex">
                                <FormDescription className="text-red-500">
                                    {form.getFieldState('email').error?.message}
                                </FormDescription>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="space-y-0 flex">
                                <FormDescription className="text-red-500">
                                    {
                                        form.getFieldState('password').error
                                            ?.message
                                    }
                                </FormDescription>
                                <FormControl>
                                    <Input placeholder="Password" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col justify-end gap-2">
                    <Button className="float-right basis-full">Login</Button>
                    {/* <Link href={'/auth/callback'}> */}
                    <Button
                        className="float-right basis-full w-full"
                        variant="outline"
                        onClick={onGoogleSignIn}
                    >
                        <div className="flex flex-row gap-1  items-center">
                            <GoogleAvatar className="w-5 h-5" />
                            <p>Google</p>
                        </div>
                    </Button>
                    {/* </Link> */}
                </div>
            </Form>
        </div>
    );
};

LoginForm.displayName = 'LoginForm';
