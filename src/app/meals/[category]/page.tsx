import MealHeader from '@/components/meals/MealHeader';
import Meals from '@/components/meals/Meals';
import { Suspense } from 'react';

const Page = async ({ params }: { params: Promise<{ category: string }> }) => {
    const { category } = await params;
    return (
        <div className="w-full h-full space-y-4">
            <MealHeader category={category} />
            <Suspense fallback={<div>Loading {category} meals content...</div>}>
                <Meals category={category} />
            </Suspense>
        </div>
    );
};

export default Page;
