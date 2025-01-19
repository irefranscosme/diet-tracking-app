import MealCategoryContent from '@/components/meals/MealCategoryContent';
import { SearchBar } from '@/components/search/SearchBar';
import { Button } from '@/components/ui/button';
import React from 'react';

const MealsLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="h-full container mx-auto p-5 flex flex-col gap-5">
            <div>
                <h1 className="uppercase font-bold text-lg">Meals</h1>
                <p>
                    You can add your daily consumable meals here so you don’t
                    need to manually input your macro. You can just select it on
                    the tracker page.
                </p>
            </div>
            <div className="flex flex-row gap-2 justify-between items-center">
                <SearchBar placeholder="Search meals..." />
                <Button>+ Add Meal</Button>
            </div>
            <div>
                <MealCategoryContent />
            </div>
            {children}
        </div>
    );
};

export default MealsLayout;
