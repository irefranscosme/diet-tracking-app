import { ChartData } from '@/types/charts/ChartData';
import React from 'react';
import { MacroRadicalChart } from './base/MacroRadicalChart';

const calories: ChartData[] = [
    { macro: 'calories', total: 200, fill: '#22c55e' },
];
export const CaloriesChart = async () => {
    const randomNumber = () => Math.floor(Math.random() * 9000) + 1000;
    await new Promise((resolve) => setTimeout(resolve, randomNumber()));
    return <MacroRadicalChart chartData={calories} title="Calories" />;
};
