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

interface SelectedProductTablePros {
    products: Product[];
}

export const SelectedProductTable = ({
    products,
}: SelectedProductTablePros) => {
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
                {products.length > 0 ? (
                    products.map((product, index) => (
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
                    ))
                ) : (
                    <TableRow>
                        <TableCell>No selected products found.</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};
