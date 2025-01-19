import { CategoryForm } from '@/components/categories/CategoryForm';
import { ProductSelectionContainer } from '@/components/products/ProductSelectionContainer';
import { SearchBar } from '@/components/search/SearchBar';
import { CategoryDictionary } from '@/utils/category';
import React from 'react';

// TODO: improve metadata
export const metadata = {
    title: 'Tracker | Breakfast - Diet Tracking App',
    description: 'Tracker | Breakfast - Diet Tracking App Descripition',
};

const Page = async ({ params }: { params: Promise<{ category: string }> }) => {
    const { category } = await params;
    return (
        <div className="w-full px-4 h-full flex flex-col gap-2 justify-evenly p-5">
            <h1 className="uppercase font-bold text-lg">
                {CategoryDictionary[category]}
            </h1>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <SearchBar />
                    <ProductSelectionContainer category={category} />
                </div>
                <CategoryForm category={category} />
            </div>
        </div>
    );
};

export default Page;
