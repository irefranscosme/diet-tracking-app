import { LoginForm } from '@/components/forms/LoginForm';
import { BicepsFlexed } from 'lucide-react';

// TODO: improve title and description of the app
export const metadata = {
    title: 'Diet Tracking App',
    description: 'Diet Tracking App Descripition',
};

export default function Home() {
    const date = new Date().getFullYear();
    return (
        <div className="container mx-auto max-w-sm flex flex-col justify-between items-center font-[family-name:var(--font-geist-sans)]">
            <main className="basis-full w-full flex items-center">
                <div className="basis-full flex flex-col gap-2">
                    <div className="flex flex-col justify-center items-center text-center">
                        <BicepsFlexed className="w-11 h-11" />
                    </div>
                    <LoginForm />
                </div>
            </main>
            <footer>
                <p className="py-2">
                    All Rights Reserved - Diet Tracking App {date}.
                </p>
            </footer>
        </div>
    );
}
