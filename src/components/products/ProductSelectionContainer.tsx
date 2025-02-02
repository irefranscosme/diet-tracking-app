'use client';

import React, { useState } from 'react';
import { ProductSelection } from './ProductSelection';
import { Product } from '@/types/Product';
import { SelectedProductTable } from './SelectedProductTable';

interface ProductSelectionContainerProps {
    category: string;
}

export const ProductSelectionContainer = ({
    category,
}: ProductSelectionContainerProps) => {
    const [products, setProducts] = useState<Product[]>([]);

    const handleSetProduct = ({ productData }: { productData: Product }) => {
        const product = products?.find(
            (product) => product.id === productData?.id,
        );
        if (product) {
            setProducts((previousProduct) =>
                previousProduct.filter(
                    (previousProduct) => previousProduct.id !== product.id,
                ),
            );
        } else {
            setProducts((previousProduct) => [...previousProduct, productData]);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <ProductSelection
                category={category}
                onSelect={(productData) => handleSetProduct(productData)}
            />
            <div className="flex flex-col gap-2 py-8">
                <article className="flex flex-col gap-2">
                    <div>
                        <h2 className="font-medium">Selected Products</h2>
                        <p className="text-sm text-muted-foreground">
                            A list of your selected products.
                        </p>
                    </div>
                    <SelectedProductTable products={products} />
                </article>
                {/* TODO: Total Macros */}
            </div>
            {/* <MealForm category={category} route={routes.tracker} /> */}
        </div>
    );
};
