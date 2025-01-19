import Meals from '@/components/meals/Meals';
import React, { Suspense } from 'react';

const Page = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading overall meals content...</div>}>
                <Meals />
            </Suspense>
        </div>
    );
};

export default Page;
