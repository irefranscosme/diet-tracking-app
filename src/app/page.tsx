import { Button } from '@/components/ui/button';
import { routes } from '@/utils/routes';
import Link from 'next/link';

// TODO: improve title and description of the app
export const metadata = {
    title: 'Diet Tracking App',
    description: 'Diet Tracking App Descripition',
};

export default function Home() {
    return (
        // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main>
            <article className="prose lg:prose-xl">
                <h1>Diet Tracking Application</h1>
                <Link href={routes.dashboard}>
                    <Button size="default">Go to Dashboard</Button>
                </Link>
            </article>
        </main>
        // </div>
    );
}
