'use client';

import React, { memo, useState } from 'react';
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
import { useRouter } from 'next/navigation';
import BackButton from '../navigation/BackButton';
import { MacroMealDictionary } from '@/utils/category';
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog';
import Progress from '../progress/Progress';

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

interface MealFormProps {
    category: string;
    route: string;
}

// TODO: why this is on memo? are there any re-rendering issues?
// TODO: separate meal form and macro form since backend table will be different
export const MealForm = memo(({ category, route }: MealFormProps) => {
    const [openDialog, setOpenDialog] = useState(false);
    // const [progress, setProgress] = useState(0);
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

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        form.clearErrors();
        await new Promise((resolve) => setTimeout(resolve, 3000));
        console.log(values);
        router.push(`${route}/${category}/confirmation`);
    };

    return (
        <div className="w-full space-y-8 mx-auto">
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
                                            value={
                                                MacroMealDictionary[category] ||
                                                MacroMealDictionary['default']
                                            }
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
                        {/* TODO: type of food is already the category input field */}
                        {/* <FormField
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
                        /> */}
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
                    <Progress
                        isSubmitting={form.formState.isSubmitting}
                        className="rounded-none"
                    />
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            You are about to save the following:
                        </AlertDialogDescription>
                        <ul className="mt-2">
                            <li>
                                Category:{' '}
                                <span className="font-semibold">
                                    {
                                        MacroMealDictionary[
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
                            disabled={form.formState.isSubmitting}
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
});

MealForm.displayName = 'Meal Form';
