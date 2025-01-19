import TotalMacroTable from '@/components/confirmation/TotalMacroTable';
import BackButton from '@/components/navigation/BackButton';
import { routes } from '@/utils/routes';
import React, { Suspense } from 'react';

// TODO: import metadata
export const metadata = {
    title: 'Tracker | Breakfast - Diet Tracking App',
    description: 'Tracker | Breakfast - Diet Tracking App Descripition',
};

// TODO: fetch the overall total of the user macros today.
const Page = () => {
    return (
        <div className="space-y-8 max-w-4xl flex flex-col items-center justify-center h-full mx-auto">
            <p className="uppercase font-medium">
                Thank you for your dedication to getting fit, your hard work and
                commitment are truly inspiring!
            </p>
            <h1 className="text-lg font-bold uppercase text-left">
                You total macro for today:
            </h1>
            <div className="w-full">
                <Suspense fallback={'Loading total of your macros today.'}>
                    <TotalMacroTable />
                </Suspense>
            </div>
            <BackButton route={routes.tracker} title={'Tracker'} />
        </div>
    );
};

export default Page;
