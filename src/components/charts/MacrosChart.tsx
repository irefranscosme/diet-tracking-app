import React from 'react';
import { MacroPieChart } from './base/MacroPieChart';

export const MacrosChart = async () => {
    const randomNumber = () => Math.floor(Math.random() * 9000) + 1000;
    await new Promise((resolve) => setTimeout(resolve, randomNumber()));
    return <MacroPieChart />;
};
