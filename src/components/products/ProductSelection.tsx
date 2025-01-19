'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Product } from '@/types/Product';
import { ProductCard } from './ProductCard';

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

const ProductSchema = z.object({
    products: z
        .array(
            z.object({
                id: z.number(),
                name: z.string(),
                type: z.string(),
                calories: z.number(),
                protein: z.number(),
                carbs: z.number(),
                sugar: z.number(),
                fat: z.number(),
                saturated_fat: z.number(),
            }),
        )
        .refine((value) => value.some((product) => product), {
            message: 'You have to select at least one item.',
        }),
});

export function ProductSelection() {
    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            products: [],
        },
    });

    function onSubmit(data: z.infer<typeof ProductSchema>) {
        console.log(data);
        // toast({
        //     title: 'You submitted the following values:',
        //     description: (
        //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //             <code className="text-white">
        //                 {JSON.stringify(data, null, 2)}
        //             </code>
        //         </pre>
        //     ),
        // });
    }

    const isSelected = (selectedProducts: Product[], id: number) => {
        const product = selectedProducts?.find((product) => product.id === id);

        if (product) {
            return product.id === id;
        } else {
            return false;
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="products"
                    render={() => (
                        <FormItem>
                            <div className="mb-4 flex flex-row justify-between items-center">
                                <div>
                                    <FormLabel className="text-base">
                                        Products
                                    </FormLabel>
                                    <FormDescription>
                                        Select the products you consumed.
                                    </FormDescription>
                                </div>
                                <Button type="submit">Save Selection</Button>
                            </div>
                            <div className="flex gap-4 w-full overflow-x-scroll pb-4">
                                {products.map((item, index) => (
                                    <FormField
                                        key={index}
                                        control={form.control}
                                        name="products"
                                        render={({ field: products }) => {
                                            return (
                                                <FormItem
                                                    key={item.id}
                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                >
                                                    <div className="flex items-center relative">
                                                        <div className="absolute right-0 top-0 pt-3 pr-4">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={isSelected(
                                                                        products.value,
                                                                        item.id,
                                                                    )}
                                                                    onCheckedChange={(
                                                                        checked,
                                                                    ) => {
                                                                        return checked
                                                                            ? products.onChange(
                                                                                  [
                                                                                      ...products?.value,
                                                                                      item,
                                                                                  ],
                                                                              )
                                                                            : products.onChange(
                                                                                  products?.value?.filter(
                                                                                      (
                                                                                          value,
                                                                                      ) =>
                                                                                          value.id !==
                                                                                          item.id,
                                                                                  ),
                                                                              );
                                                                    }}
                                                                />
                                                            </FormControl>
                                                        </div>
                                                        <FormLabel className="text-sm font-normal">
                                                            <ProductCard
                                                                product={item}
                                                            />
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            );
                                        }}
                                    />
                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
