import React from 'react';
import { Card, CardContent } from '../ui/card';

interface MacroCard {
    title: string;
    color?: string;
}

const MacroCard = ({ title, color = 'auto' }: MacroCard) => {
    return (
        <Card className="w-full">
            <CardContent className="h-full p-4 flex items-center justify-center">
                <article className="flex flex-col items-center">
                    <h2 className={`text-3xl font-bold ${color}`}>1000</h2>
                    <p className="font-semibold">{title}</p>
                </article>
            </CardContent>
        </Card>
    );
};

export default MacroCard;
