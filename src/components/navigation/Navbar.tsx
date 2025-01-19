'use client';

import { memo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import { routes } from '@/utils/routes';
import { useActiveLink } from '@/hooks/useActiveLink';

const Navbar = memo(() => {
    const { isActive } = useActiveLink();
    return (
        <nav className="flex justify-between px-4 py-2 border items-center">
            <ul className="flex flex-row gap-3">
                <li
                    className={`${
                        isActive(routes.dashboard)
                            ? 'auto font-semibold'
                            : 'text-gray-500 font-semibold'
                    }`}
                >
                    <Link href={routes.dashboard}>Dashboard</Link>
                </li>
                <li
                    className={`${
                        isActive(routes.tracker)
                            ? 'auto font-semibold'
                            : 'text-gray-500 font-semibold'
                    }`}
                >
                    <Link href={routes.tracker}>Tracker</Link>
                </li>
                <li
                    className={`${
                        isActive(routes.meals)
                            ? 'auto font-semibold'
                            : 'text-gray-500 font-semibold'
                    }`}
                >
                    <Link href={routes.meals}>Meals</Link>
                </li>
            </ul>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </nav>
    );
});

Navbar.displayName = 'Navbar';

export default Navbar;
