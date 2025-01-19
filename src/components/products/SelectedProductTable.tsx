import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';
import { Product } from '@/types/Product';

// TODO: remove for actual data;
const products: Product[] = [
    {
        id: 1,
        name: 'Anchor Protein+',
        type: 'milk',
        calories: 401,
        protein: 24,
        carbs: 0,
        sugar: 0,
        fat: 9,
        saturated_fat: 4,
    },
    {
        id: 2,
        name: 'Chicken',
        type: 'meat',
        calories: 401,
        protein: 24,
        carbs: 0,
        sugar: 0,
        fat: 9,
        saturated_fat: 4,
    },
    {
        id: 3,
        name: 'Rice',
        type: 'N/A',
        calories: 401,
        protein: 24,
        carbs: 0,
        sugar: 0,
        fat: 9,
        saturated_fat: 4,
    },
    {
        id: 4,
        name: 'Rolled Oats',
        type: 'oats',
        calories: 401,
        protein: 24,
        carbs: 0,
        sugar: 0,
        fat: 9,
        saturated_fat: 4,
    },
    {
        id: 5,
        name: 'Banana',
        type: 'fruits',
        calories: 401,
        protein: 24,
        carbs: 0,
        sugar: 0,
        fat: 9,
        saturated_fat: 4,
    },
];

export const SelectedProductTable = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Calories</TableHead>
                    <TableHead>Protein</TableHead>
                    <TableHead>Carbs</TableHead>
                    <TableHead>Sugar</TableHead>
                    <TableHead>Fat</TableHead>
                    <TableHead>Saturated Fat</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">
                            {product.name}
                        </TableCell>
                        <TableCell>{product.calories}</TableCell>
                        <TableCell>{product.protein}</TableCell>
                        <TableCell>{product.carbs}</TableCell>
                        <TableCell>{product.sugar}</TableCell>
                        <TableCell>{product.fat}</TableCell>
                        <TableCell>{product.saturated_fat}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
