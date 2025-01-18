import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

export const useActiveLink = () => {
    const pathname = usePathname();

    const isActive = useCallback(
        (route: string) => {
            const splittedRoute: string[] = route.split('/');
            const splittedPath: string[] = pathname.split('/');

            const areEqual = splittedRoute.every((item, index) => {
                return item === splittedPath[index];
            });

            return areEqual;
        },
        [pathname],
    );

    return {
        isActive: isActive,
    };
};
