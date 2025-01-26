import React from 'react';
import { SearchBar } from '../search/SearchBar';
import AddMealDialog from './AddMealDialog';
import MealCategoryContent from './MealCategoryContent';

interface MealHeaderProps {
    category: string;
}

const MealHeader = ({ category }: MealHeaderProps) => {
    return (
        <div className="space-y-4">
            <div>
                <h1 className="uppercase font-bold text-lg">Meals</h1>
                {/* TODO: Fix quotation */}
                <p>
                    You can add your daily consumable meals here so you don’t
                    need to manually input your macro. You can just select it on
                    the tracker page.
                </p>
            </div>
            <div className="flex flex-row gap-2 justify-between items-center">
                <SearchBar placeholder="Search meals..." />
                <AddMealDialog category={category} />
            </div>
            <div>
                <MealCategoryContent />
            </div>
        </div>
    );
};

export default MealHeader;
