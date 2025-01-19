'use client';

import React, { memo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from '../ui/form';
import { Input } from '../ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import {
    AlertDialogContent,
    AlertDialog,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '../ui/alert-dialog';
import { CategoryDictionary } from '@/utils/category';
import { Progress } from '../ui/progress';
import { useRouter } from 'next/navigation';
import { routes } from '@/utils/routes';
import BackButton from '../navigation/BackButton';

const formSchema = z.object({
    category: z.string(),
    name: z.string(),
    type: z.string(),
    protein: z.string().or(z.number()),
    calories: z.string().or(z.number()),
    carbs: z.string().or(z.number()),
    sugar: z.string().or(z.number()),
    fat: z.string().or(z.number()),
    saturated_fat: z.string().or(z.number()),
});

interface CategoryFormProps {
    category: string;
}

export const CategoryForm = memo(({ category }: CategoryFormProps) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [progress, setProgress] = useState(0);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: category,
            name: '',
            type: '',
            calories: '0',
            carbs: '0',
            fat: '0',
            protein: '0',
            saturated_fat: '0',
            sugar: '0',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        startTransition(async () => {
            form.clearErrors();
            let progress = 0;
            const incrementStep = 1;
            const intervalDuration = 50;

            const interval = setInterval(() => {
                progress += incrementStep;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setProgress(100);
                }
                setProgress(Math.round(progress));
            }, intervalDuration);

            await new Promise((resolve) => setTimeout(resolve, 3000));
            console.log(values);
            clearInterval(interval);
            router.push(`${routes.tracker}/${category}/confirmation`);
        });
    };

    return (
        <div className="w-full space-y-8 mx-auto">
            <div>
                <article>
                    <h2 className="font-medium">Manual Method</h2>
                    <p className="text-sm text-muted-foreground">
                        You can use this to input your macro for{' '}
                        <span className="lowercase">
                            {CategoryDictionary[category]}{' '}
                        </span>
                        here.
                    </p>
                </article>
            </div>
            <Form {...form}>
                <div className="space-y-8">
                    <div className="max-w-2xl mx-auto">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem className="space-y-0 flex">
                                    <FormLabel className="basis-full flex items-center justify-center border">
                                        Category
                                    </FormLabel>
                                    <FormControl className="basis-full border border-l-0">
                                        <Input
                                            placeholder="Your protein intake"
                                            {...field}
                                            value={CategoryDictionary[category]}
                                            disabled={true}
                                            required
                                            className="mt-0 basis-full flex items-center justify-center rounded-none shadow-none"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="space-y-0 flex">
                                    <div className=" gap-2 basis-full border-t-0 flex items-center justify-center border">
                                        <FormLabel>
                                            Name
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </FormLabel>
                                    </div>
                                    {/* <FormDescription className="text-red-500">
                                    {
                                        form.getFieldState('protein').error
                                            ?.message
                                    }
                                </FormDescription> */}
                                    <FormControl className="basis-full">
                                        <Input
                                            placeholder="Food you consume"
                                            {...field}
                                            required
                                            className="mt-0 basis-full flex items-center justify-center border border-l-0 border-t-0 rounded-none shadow-none"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem className="space-y-0 flex">
                                    <div className=" gap-2 basis-full border-t-0 flex items-center justify-center border">
                                        <FormLabel>
                                            Type of Food
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </FormLabel>
                                    </div>
                                    {/* <FormDescription className="text-red-500">
                                    {
                                        form.getFieldState('protein').error
                                            ?.message
                                    }
                                </FormDescription> */}
                                    <FormControl className="basis-full">
                                        <Input
                                            placeholder="Type of the food you consume."
                                            {...field}
                                            required
                                            className="mt-0 basis-full flex items-center justify-center border border-l-0 border-t-0 rounded-none shadow-none"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="protein"
                            render={({ field }) => (
                                <FormItem className="space-y-0 flex">
                                    <div className=" gap-2 basis-full border-t-0 flex items-center justify-center border">
                                        <FormLabel>
                                            Protein
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </FormLabel>
                                    </div>
                                    {/* <FormDescription className="text-red-500">
                                    {
                                        form.getFieldState('protein').error
                                            ?.message
                                    }
                                </FormDescription> */}
                                    <FormControl className="basis-full">
                                        <Input
                                            placeholder="Your protein intake"
                                            {...field}
                                            required
                                            type="number"
                                            min={0}
                                            className="mt-0 basis-full flex items-center justify-center border border-l-0 border-t-0 rounded-none shadow-none"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="calories"
                            render={({ field }) => (
                                <FormItem className="space-y-0 flex">
                                    <div className="gap-2 basis-full border-t-0 flex items-center justify-center border">
                                        <FormLabel>
                                            Calories
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </FormLabel>
                                    </div>
                                    <FormDescription className="text-red-500">
                                        {
                                            form.getFieldState('calories').error
                                                ?.message
                                        }
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            placeholder="Your calory intake"
                                            {...field}
                                            required
                                            type="number"
                                            min={0}
                                            className="mt-0 basis-full flex items-center justify-center border border-l-0 border-t-0 rounded-none shadow-none"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="carbs"
                            render={({ field }) => (
                                <FormItem className="space-y-0 flex">
                                    <div className="gap-2 basis-full border-t-0 flex items-center justify-center border">
                                        <FormLabel>
                                            Carbs
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </FormLabel>
                                    </div>
                                    <FormDescription className="text-red-500">
                                        {
                                            form.getFieldState('carbs').error
                                                ?.message
                                        }
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            placeholder="Your carb intake"
                                            {...field}
                                            required
                                            type="number"
                                            min={0}
                                            className="mt-0 basis-full flex items-center justify-center border border-l-0 border-t-0 rounded-none shadow-none"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sugar"
                            render={({ field }) => (
                                <FormItem className="space-y-0 flex">
                                    <div className=" gap-2 basis-full border-t-0 flex items-center justify-center border">
                                        <FormLabel>Sugar (Optional)</FormLabel>
                                    </div>
                                    <FormDescription className="text-red-500">
                                        {
                                            form.getFieldState('sugar').error
                                                ?.message
                                        }
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            placeholder="Your sugar intake"
                                            {...field}
                                            type="number"
                                            min={0}
                                            className="mt-0 basis-full flex items-center justify-center border border-l-0 border-t-0 rounded-none shadow-none"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fat"
                            render={({ field }) => (
                                <FormItem className="space-y-0 flex">
                                    <div className=" gap-2 basis-full border-t-0 flex items-center justify-center border">
                                        <FormLabel>Fat (Optional)</FormLabel>
                                    </div>
                                    <FormDescription className="text-red-500">
                                        {
                                            form.getFieldState('fat').error
                                                ?.message
                                        }
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            placeholder="Your fat intake"
                                            {...field}
                                            type="number"
                                            min={0}
                                            className="mt-0 basis-full flex items-center justify-center border border-l-0 border-t-0 rounded-none shadow-none"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="saturated_fat"
                            render={({ field }) => (
                                <FormItem className="space-y-0 flex">
                                    <div className=" gap-2 basis-full border-t-0 flex items-center justify-center border">
                                        <FormLabel>
                                            Saturated Fat (Optional)
                                        </FormLabel>
                                    </div>
                                    <FormDescription className="text-red-500">
                                        {
                                            form.getFieldState('saturated_fat')
                                                .error?.message
                                        }
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            placeholder="Your saturated fat intake"
                                            {...field}
                                            type="number"
                                            min={0}
                                            className="mt-0 basis-full flex items-center justify-center border border-l-0 border-t-0 rounded-none shadow-none"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-between">
                        {/* <Link to>
                            <Button variant="outline">Back</Button>
                        </Link> */}
                        <BackButton />
                        <Button
                            onClick={() => setOpenDialog(true)}
                            className="float-right"
                            type="button"
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </Form>

            <AlertDialog open={openDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <p>You are about to save the following:</p>
                        <ul className="mt-2">
                            <li>
                                Category:{' '}
                                <span className="font-semibold">
                                    {
                                        CategoryDictionary[
                                            form.getValues('category')
                                        ]
                                    }
                                </span>
                            </li>
                            <li>
                                Protein:{' '}
                                <span className="font-semibold">
                                    {form.getValues('protein')}
                                </span>
                            </li>
                            <li>
                                Calories:{' '}
                                <span className="font-semibold">
                                    {form.getValues('calories')}
                                </span>
                            </li>
                            <li>
                                Carbs:{' '}
                                <span className="font-semibold">
                                    {form.getValues('carbs')}
                                </span>
                            </li>
                            <li>
                                Sugar:{' '}
                                <span className="font-semibold">
                                    {form.getValues('sugar')}
                                </span>
                            </li>
                            <li>
                                Fat:{' '}
                                <span className="font-semibold">
                                    {form.getValues('fat')}
                                </span>
                            </li>
                            <li>
                                Saturated Fat:{' '}
                                <span className="font-semibold">
                                    {form.getValues('saturated_fat')}
                                </span>
                            </li>
                        </ul>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOpenDialog(false)}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => form.handleSubmit(onSubmit)()}
                            disabled={isPending}
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                    {isPending && (
                        <Progress
                            value={progress}
                            className="absolute rounded-none h-1"
                        />
                    )}
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
});

CategoryForm.displayName = 'Category Form';
