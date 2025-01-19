'use server';

import React from 'react';
import { ProductSelectionContainer } from './ProductSelectionContainer';

// TODO: create an interface for props
const Products = async ({ category }: { category: string }) => {
    const randomNumber = () => Math.floor(Math.random() * 9000) + 1000;
    await new Promise((resolve) => setTimeout(resolve, randomNumber()));
    return (
        <div>
            <ProductSelectionContainer category={category} />
        </div>
    );
};

export default Products;
