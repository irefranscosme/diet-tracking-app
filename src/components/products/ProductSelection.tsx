'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ControllerRenderProps, useForm } from 'react-hook-form';
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
import { CheckedState } from '@radix-ui/react-checkbox';
import { useRouter } from 'next/navigation';
import { routes } from '@/utils/routes';
import Progress from '../progress/Progress';
import { Save, ScanLine } from 'lucide-react';
import AddMealDialog from '../meals/AddMealDialog';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip';

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

interface ProductSelectionProps {
    category: string;
    onSelect: ({
        productData,
        isChecked,
    }: {
        productData: Product;
        isChecked: boolean;
    }) => void;
}

export function ProductSelection({
    category,
    onSelect,
}: ProductSelectionProps) {
    const router = useRouter();

    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            products: [],
        },
    });

    const onSubmit = async (data: z.infer<typeof ProductSchema>) => {
        form.clearErrors();
        console.log(data);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        router.push(`${routes.tracker}/${category}/confirmation`);
    };

    const isSelected = (
        selectedProducts: Product[],
        currentProduct: Product,
    ) => {
        const product = selectedProducts?.find(
            (product) => product.id === currentProduct.id,
        );

        if (product) {
            const isChecked = product.id === currentProduct.id;
            return isChecked;
        } else {
            return false;
        }
    };

    const handleOnCheckChange = ({
        checked,
        products,
        item,
    }: {
        checked: CheckedState;
        products: ControllerRenderProps<
            {
                products: {
                    type: string;
                    id: number;
                    name: string;
                    calories: number;
                    protein: number;
                    carbs: number;
                    sugar: number;
                    fat: number;
                    saturated_fat: number;
                }[];
            },
            'products'
        >;
        item: Product;
    }) => {
        if (checked) {
            products.onChange([...products?.value, item]);
            onSelect({
                productData: item,
                isChecked: true,
            });
        } else {
            onSelect({
                productData: item,
                isChecked: false,
            });
            products.onChange(
                products?.value?.filter((value) => value.id !== item.id),
            );
        }
    };

    return (
        <div>
            <Progress isSubmitting={form.formState.isSubmitting} />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
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
                                    <div className="flex flex-row gap-2 items-center">
                                        <Button
                                            type="submit"
                                            disabled={
                                                form.formState.isSubmitting
                                            }
                                        >
                                            <div className="flex flex-row gap-2 items-center">
                                                <Save />
                                                <p> Save Selection</p>
                                            </div>
                                        </Button>
                                        {/* TODO: Pro Feature: AI Calorie Calculator Scanner for Meal using Open AI or Gemini */}
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger
                                                    className="opacity-50"
                                                    asChild
                                                >
                                                    <Button type="button">
                                                        <div className="flex flex-row gap-2 items-center pointer-events-none">
                                                            <ScanLine />
                                                            <p>Scan</p>
                                                        </div>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>
                                                        AI Calorie Calculator
                                                        Scanner Soon
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        <AddMealDialog
                                            category={category}
                                            isManual={true}
                                        />
                                    </div>
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
                                                            <FormControl className="absolute top-0 right-0 m-4">
                                                                <Checkbox
                                                                    checked={isSelected(
                                                                        products.value,
                                                                        item,
                                                                    )}
                                                                    onCheckedChange={(
                                                                        checked,
                                                                    ) =>
                                                                        handleOnCheckChange(
                                                                            {
                                                                                checked,
                                                                                item,
                                                                                products,
                                                                            },
                                                                        )
                                                                    }
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="text-sm font-normal cursor-pointer">
                                                                <ProductCard
                                                                    product={
                                                                        item
                                                                    }
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
        </div>
    );
}
