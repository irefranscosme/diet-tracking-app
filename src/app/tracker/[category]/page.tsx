import { MealForm } from '@/components/forms/MealForm';
import Products from '@/components/products/Products';
import { SearchBar } from '@/components/search/SearchBar';
import { MacroMealDictionary } from '@/utils/category';
import { routes } from '@/utils/routes';
import { Suspense } from 'react';

// TODO: improve metadata
export const metadata = {
    title: 'Tracker | Breakfast - Diet Tracking App',
    description: 'Tracker | Breakfast - Diet Tracking App Descripition',
};

const Page = async ({ params }: { params: Promise<{ category: string }> }) => {
    const { category } = await params;
    return (
        <div className="w-full px-4 h-full space-y-4">
            <div className="space-y-2">
                <h1 className="uppercase font-bold text-lg">
                    {MacroMealDictionary[category]}
                </h1>
                <SearchBar placeholder="Search products..." />
            </div>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <Suspense
                        fallback={
                            <div className="flex h-full">
                                Loading product selection...
                            </div>
                        }
                    >
                        <Products category={category} />
                    </Suspense>
                </div>
                <MealForm category={category} route={routes.tracker} />
            </div>
        </div>
    );
};

export default Page;
