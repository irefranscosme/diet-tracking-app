'use client';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { routes } from '@/utils/routes';
// import { useActiveLink } from '@/hooks/useActiveLink';

const CategoryContent = () => {
    // const { isActive } = useActiveLink();
    return (
        <div className="grid gap-2 lg:grid-cols-4  md:grid-cols-2 sm:grid-cols-1">
            <Link
                href={`${routes.tracker}/break-fast`}
                className="h-[10em] sm:h-[10em] lg:h-[20em] basis-[25%]"
            >
                <Button
                    variant={'outline'}
                    className="w-full h-full flex items-center justify-center rounded-xl"
                >
                    <p>Breakfast</p>
                </Button>
            </Link>
            <Link
                href={`${routes.tracker}/lunch`}
                className="h-[10em] sm:h-[10em] lg:h-[20em] basis-[25%]"
            >
                <Button
                    variant={'outline'}
                    className="w-full h-full flex items-center justify-center rounded-xl"
                >
                    <p>Lunch</p>
                </Button>
            </Link>
            <Link
                href={`${routes.tracker}/dinner`}
                className="h-[10em] sm:h-[10em] lg:h-[20em] basis-[25%]"
            >
                <Button
                    variant={'outline'}
                    className="w-full h-full flex items-center justify-center rounded-xl"
                >
                    <p>Dinner</p>
                </Button>
            </Link>
            <Link
                href={`${routes.tracker}/snack`}
                className="h-[10em] sm:h-[10em] lg:h-[20em] basis-[25%]"
            >
                <Button
                    variant={'outline'}
                    className="w-full h-full flex items-center justify-center rounded-xl"
                >
                    <p>Snacks</p>
                </Button>
            </Link>
        </div>
    );
};

export default CategoryContent;
