import { MacroBarChartHorizontal } from '@/components/charts/MacroBarChartHorizontal';
import { MacroPieChart } from '@/components/charts/MacroPieChart';
import { MacroBarChartVertical } from '@/components/charts/MacroBarChartVertical';
import { MacroRadicalChart } from '@/components/charts/MacroRadicalChart';
import { ChartData } from '@/types/charts/ChartData';

// TODO: import metadata
export const metadata = {
    title: 'Dashboard - Diet Tracking App',
    description: 'Dashboard - Diet Tracking App Descripition',
};

const calories: ChartData[] = [
    { macro: 'calories', total: 200, fill: '#22c55e' },
];
const protein: ChartData[] = [
    { macro: 'protein', total: 180, fill: '#3b82f6' },
];
const carbs: ChartData[] = [{ macro: 'carbs', total: 243, fill: '#d946ef' }];

export default function Page() {
    return (
        <main className="container mx-auto py-5 px-5">
            <div className="flex flex-col gap-5">
                <div className="space-y-4 basis-9">
                    <h1 className="font-bold text-lg">
                        Welcome Back, John Doe!
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
                            <MacroRadicalChart
                                chartData={calories}
                                title="Calories"
                            />
                            <MacroRadicalChart
                                chartData={protein}
                                title="Protein"
                            />
                            <MacroRadicalChart
                                chartData={carbs}
                                title="Carbs"
                            />
                        </div>
                        <MacroBarChartHorizontal />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-5 row-span-3">
                    <div className="col-span-2">
                        <MacroBarChartVertical />
                    </div>
                    <MacroPieChart />
                </div>
            </div>
        </main>
    );
}
