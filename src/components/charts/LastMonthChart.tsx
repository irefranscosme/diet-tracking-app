import { MacroBarChartVertical } from './base/MacroBarChartVertical';

export const LastMonthChart = async () => {
    const randomNumber = () => Math.floor(Math.random() * 9000) + 1000;
    await new Promise((resolve) => setTimeout(resolve, randomNumber()));
    return <MacroBarChartVertical />;
};
