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
import { Product } from '@/types/Product';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.type}</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>Nutrients</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Calories</TableHead>
                            <TableHead>Protein</TableHead>
                            <TableHead>Carbs</TableHead>
                            <TableHead>Sugar</TableHead>
                            <TableHead>Fat</TableHead>
                            <TableHead>Saturated Fat</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">
                                {product.calories || '-'}
                            </TableCell>
                            <TableCell>{product.protein || '-'}</TableCell>
                            <TableCell>{product.carbs || '-'}</TableCell>
                            <TableCell className="text-right">
                                {product.sugar || '-'}
                            </TableCell>
                            <TableCell className="text-right">
                                {product.fat || '-'}
                            </TableCell>
                            <TableCell className="text-right">
                                {product.saturated_fat || '-'}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
