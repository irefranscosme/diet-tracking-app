'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

interface BackButton {
    route?: string;
    title?: string;
}

const BackButton = ({ route, title }: BackButton) => {
    const router = useRouter();
    return (
        <div>
            {route ? (
                <Link href={route}>
                    <Button>Back to {title} Page</Button>
                </Link>
            ) : (
                <Button variant="outline" onClick={() => router.back()}>
                    Go Back
                </Button>
            )}
        </div>
    );
};

export default BackButton;
