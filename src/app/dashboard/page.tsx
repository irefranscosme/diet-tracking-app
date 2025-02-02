import { Suspense } from 'react';
import { CaloriesChart } from '@/components/charts/CaloriesChart';
import { ProteinChart } from '@/components/charts/ProteinChart';
import { CarbsChart } from '@/components/charts/CarbsChart';
import { LastMonthChart } from '@/components/charts/LastMonthChart';
import { MacrosChart } from '@/components/charts/MacrosChart';
import { ExtraMacrosChart } from '@/components/charts/ExtraMacrosChart';
import { createSupabaseServer } from '@/utils/supabase/server';

// TODO: improve metadata
export const metadata = {
    title: 'Dashboard - Diet Tracking App',
    description: 'Dashboard - Diet Tracking App Descripition',
};

export default async function Page() {
    const supabase = await createSupabaseServer();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    return (
        <main className="container mx-auto py-5 px-5">
            <div className="flex flex-col gap-5">
                <div className="space-y-4 basis-9">
                    <h1 className="font-bold text-lg">
                        Welcome Back, {user?.user_metadata.name || 'User'}
                    </h1>
                    <div className="flex flex-col">
                        <p>
                            Great to see you again! Ready to continue your
                            journey towards better health?
                        </p>
                        <p>
                            {
                                "Here's a quick look at your latest diet and progress:"
                            }
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-5">
                        <div className="grid grid-cols-3 gap-5 col-span-2">
                            <Suspense
                                fallback={<div>Loading calories chart...</div>}
                            >
                                <CaloriesChart />
                            </Suspense>
                            <Suspense
                                fallback={<div>Loading Protein chart...</div>}
                            >
                                <ProteinChart />
                            </Suspense>
                            <Suspense
                                fallback={<div>Loading Carbs chart...</div>}
                            >
                                <CarbsChart />
                            </Suspense>
                        </div>
                        <Suspense
                            fallback={<div>Loading Extra macros chart...</div>}
                        >
                            <ExtraMacrosChart />
                        </Suspense>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-5 row-span-3">
                    <div className="col-span-2">
                        <Suspense
                            fallback={<div>Loading last month chart...</div>}
                        >
                            <LastMonthChart />
                        </Suspense>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <MacrosChart />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}
