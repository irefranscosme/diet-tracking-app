import MealHeader from '@/components/meals/MealHeader';
import Meals from '@/components/meals/Meals';
import React, { Suspense } from 'react';

// TODO: improve metadata
export const metadata = {
    title: 'Meals - Diet Tracking App',
    description: 'Meals - Diet Tracking App Descripition',
};

const Page = async ({ params }: { params: Promise<{ category: string }> }) => {
    const { category } = await params;
    return (
        <div className="w-full h-full space-y-4">
            <MealHeader category={category} />
            <Suspense fallback={<div>Loading overall meals content...</div>}>
                <Meals />
            </Suspense>
        </div>
    );
};

export default Page;
