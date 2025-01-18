import { CategoryForm } from '@/components/categories/CategoryForm';
import { CategoryDictionary } from '@/utils/category';
import React from 'react';

// TODO: import metadata
export const metadata = {
    title: 'Tracker | Breakfast - Diet Tracking App',
    description: 'Tracker | Breakfast - Diet Tracking App Descripition',
};

const Page = async ({ params }: { params: Promise<{ category: string }> }) => {
    const { category } = await params;
    return (
        <div className="w-full px-32">
            <div>
                <h1 className="uppercase font-bold text-lg">
                    {CategoryDictionary[category]}
                </h1>
                <p>
                    Please input your{' '}
                    <span className="lowercase">
                        {CategoryDictionary[category]}{' '}
                    </span>
                    macro.
                </p>
            </div>
            <CategoryForm category={category} />
        </div>
    );
};

export default Page;
