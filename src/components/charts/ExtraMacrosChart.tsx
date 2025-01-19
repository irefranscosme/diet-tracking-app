'use server';

import { MacroBarChartHorizontal } from './base/MacroBarChartHorizontal';

export const ExtraMacrosChart = async () => {
    const randomNumber = () => Math.floor(Math.random() * 9000) + 1000;
    await new Promise((resolve) => setTimeout(resolve, randomNumber()));
    return <MacroBarChartHorizontal />;
};
