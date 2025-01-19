import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../ui/card';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';
import { Meal } from '@/types/Meal';
import { Button } from '../ui/button';

interface MealCardProps {
    meal: Meal;
}

export const MealCard = ({ meal }: MealCardProps) => {
    return (
        <Card className="w-full hover:border hover:border-black ">
            <CardHeader>
                <CardTitle>{meal.name}</CardTitle>
                <CardDescription>{meal.type}</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>
                        <Button variant={'outline'} className="cursor-pointer">
                            View Details
                        </Button>
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nutrients</TableHead>
                            <TableHead>Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">
                                Calories
                            </TableCell>
                            <TableCell className="font-bold">
                                {meal.calories || '-'}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">
                                Protein
                            </TableCell>
                            <TableCell className="font-bold">
                                {meal.protein || '-'}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Carbs</TableCell>
                            <TableCell className="font-bold">
                                {meal.carbs || '-'}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Sugar</TableCell>
                            <TableCell className="font-bold">
                                {meal.sugar || '-'}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Fat</TableCell>
                            <TableCell className="font-bold">
                                {meal.fat || '-'}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">
                                Saturated Fat
                            </TableCell>
                            <TableCell className="font-bold">
                                {meal.saturated_fat || '-'}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
