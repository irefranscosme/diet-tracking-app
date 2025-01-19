import { ChartData } from '@/types/charts/ChartData';
import React from 'react';
import { MacroRadicalChart } from './base/MacroRadicalChart';

const carbs: ChartData[] = [{ macro: 'carbs', total: 243, fill: '#d946ef' }];

export const CarbsChart = async () => {
    const randomNumber = () => Math.floor(Math.random() * 9000) + 1000;
    await new Promise((resolve) => setTimeout(resolve, randomNumber()));
    return <MacroRadicalChart chartData={carbs} title="Carbs" />;
};
