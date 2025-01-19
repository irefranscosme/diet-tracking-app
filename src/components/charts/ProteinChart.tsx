import { ChartData } from '@/types/charts/ChartData';
import React from 'react';
import { MacroRadicalChart } from './base/MacroRadicalChart';

const protein: ChartData[] = [
    { macro: 'protein', total: 180, fill: '#3b82f6' },
];

export const ProteinChart = async () => {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    return <MacroRadicalChart chartData={protein} title="Protein" />;
};
