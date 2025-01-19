import BackButton from '@/components/navigation/BackButton';
import { routes } from '@/utils/routes';
import React from 'react';

// TODO: import metadata
export const metadata = {
    title: 'Tracker | Breakfast - Diet Tracking App',
    description: 'Tracker | Breakfast - Diet Tracking App Descripition',
};

const Page = async () => {
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
                <div className="flex w-full">
                    <div className=" gap-2 basis-full flex items-center justify-center border">
                        <p>Protein</p>
                    </div>
                    <div className="mt-0 basis-full flex items-center justify-center border border-l-0 rounded-none shadow-none">
                        100
                    </div>
                </div>
                <div className="flex w-full">
                    <div className=" gap-2 basis-full border-t-0 flex items-center justify-center border">
                        <p>Calories</p>
                    </div>
                    <div className="mt-0 basis-full flex items-center justify-center border border-l-0 border-t-0 rounded-none shadow-none">
                        100
                    </div>
                </div>
                <div className="flex w-full">
                    <div className=" gap-2 basis-full border-t-0 flex items-center justify-center border">
                        <p>Carbs</p>
                    </div>
                    <div className="mt-0 basis-full flex items-center justify-center border border-l-0 border-t-0 rounded-none shadow-none">
                        100
                    </div>
                </div>
                <div className="flex w-full">
                    <div className=" gap-2 basis-full border-t-0 flex items-center justify-center border">
                        <p>Sugar</p>
                    </div>
                    <div className="mt-0 basis-full flex items-center justify-center border border-l-0 border-t-0 rounded-none shadow-none">
                        100
                    </div>
                </div>
                <div className="flex w-full">
                    <div className=" gap-2 basis-full border-t-0 flex items-center justify-center border">
                        <p>Fat</p>
                    </div>
                    <div className="mt-0 basis-full flex items-center justify-center border border-l-0 border-t-0 rounded-none shadow-none">
                        100
                    </div>
                </div>
                <div className="flex w-full">
                    <div className=" gap-2 basis-full border-t-0 flex items-center justify-center border">
                        <p>Saturated Fat</p>
                    </div>
                    <div className="mt-0 basis-full flex items-center justify-center border border-l-0 border-t-0 rounded-none shadow-none">
                        100
                    </div>
                </div>
            </div>
            <BackButton route={routes.tracker} title={'Tracker'} />
        </div>
    );
};

export default Page;
