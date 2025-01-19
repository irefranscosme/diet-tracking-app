import { CategoryForm } from '@/components/categories/CategoryForm';
import { ProductSelection } from '@/components/products/ProductSelection';
import { SelectedProductTable } from '@/components/products/SelectedProductTable';
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
        <div className="w-full px-4 py-8 h-full flex flex-col gap-2 justify-evenly">
            <h1 className="uppercase font-bold text-lg ">
                {CategoryDictionary[category]}
            </h1>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <SearchBar />
                    <ProductSelection />
                </div>
                <div className="flex flex-col gap-2">
                    <article>
                        <h2 className="font-medium">Selected Products</h2>
                        <p className="text-sm text-muted-foreground">
                            A list of your selected products.
                        </p>
                        <SelectedProductTable />
                    </article>
                    {/* TODO: Total Macros */}
                </div>
            </div>

            <CategoryForm category={category} />
        </div>
    );
};

export default Page;
