'use client';

import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { routes } from '@/utils/routes';
import { useActiveLink } from '@/hooks/useActiveLink';
import { categories, MealCategoryDictionary } from '@/utils/meal-category';

const MealCategoryContent = () => {
    const { isActive } = useActiveLink();
    return (
        <div className="flex flex-row gap-2">
            {categories.map((category, index) => (
                <Link href={`${routes.meals}/${category}`} key={index}>
                    <Button
                        variant={`${
                            isActive(`${routes.meals}/${category}`)
                                ? 'default'
                                : 'outline'
                        }`}
                    >
                        <p>{MealCategoryDictionary[category]}</p>
                    </Button>
                </Link>
            ))}
        </div>
    );
};

export default MealCategoryContent;
