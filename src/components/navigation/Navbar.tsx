'use client';

import { memo } from 'react';
import Link from 'next/link';
import { routes } from '@/utils/routes';
import { useActiveLink } from '@/hooks/useActiveLink';
import NotificationContainer from '../notification/NotificationContainer';
import Profile from '../profile/Profile';

// TODO: why this is on memo? check if there are re-rendering issues.
const Navbar = memo(() => {
    const { isActive } = useActiveLink();
    return (
        <nav className="flex justify-between px-4 py-4 border items-center">
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
            <div className="flex gap-3 flex-row items-center justify-center">
                <NotificationContainer />
                <Profile />
            </div>
        </nav>
    );
});

Navbar.displayName = 'Navbar';

export default Navbar;
