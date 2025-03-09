'use client';

import { useReducer, useState } from 'react';
import { Button } from '../ui/button';
import { Upload } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { Spinner } from '../ui/spinner';

type Macro = {
    calories: string | number | null;
    protein: string | number | null;
    carbohydrates: {
        total: string | number | null;
        fiber: string | number | null;
        sugars: string | number | null;
    };
    fat: {
        total: string | number | null;
        saturated: string | number | null;
        trans: string | number | null;
    };
    sodium: string | number | null;
    cholesterol: string | number | null;
    serving_size: string | number;
    ingredients: string[];
    explanation: string;
};

interface State {
    explanation: string | null;
    macro: Macro | null;
}

type Action = { type: 'SET_RESPONSE'; payload: State };

const initialState: State = {
    explanation: null,
    macro: null,
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_RESPONSE':
            return {
                ...state,
                explanation: action.payload.explanation,
                macro: action.payload.macro,
            };
        default:
            return state;
    }
};
const ACCEPTED_IMAGE_TYPES: string[] = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];

const FormSchema = z.object({
    imageUrl: z
        .instanceof(File)
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message: 'Only these types are allowed .jpg, .jpeg, .png and .webp',
        })
        .optional(),
});

const Uploader = () => {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [state, dispatch] = useReducer(reducer, initialState);

    const [dialog, setDialog] = useState<boolean>(false);

    const handleClose = () => {
        setImageUrl('');
        dispatch({
            type: 'SET_RESPONSE',
            payload: initialState,
        });
        setDialog(false);
    };

    const handleOpen = async () => {
        setDialog(true);
        dispatch({
            type: 'SET_RESPONSE',
            payload: initialState,
        });
    };

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            imageUrl: undefined,
        },
    });

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onloadend = () => {
                if (reader.result) {
                    resolve(reader.result as string); // Resolves with the Base64 string
                }
            };

            reader.onerror = (error) => reject(error); // Rejects on error

            reader.readAsDataURL(file); // Convert file to Base64 string
        });
    };

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log(data);
        if (data.imageUrl) {
            try {
                const imageUrl = await convertToBase64(data.imageUrl);

                if (imageUrl) {
                    const formData = new FormData();
                    formData.append('imageUrl', imageUrl);
                    const response = await fetch('/api/tracker', {
                        method: 'POST',
                        body: formData,
                    });

                    // Handle response if necessary
                    const data = await response.json();

                    const text = data.message.content;

                    const jsonPart = text.match(/```json\s([\s\S]*?)```/);

                    // Parse the JSON part into an object if it exists
                    let jsonObject: Macro | null = null;

                    if (jsonPart) {
                        if (jsonPart && jsonPart[1]) {
                            try {
                                jsonObject = JSON.parse(jsonPart[1]);
                            } catch (e) {
                                console.error('Error parsing JSON:', e);
                            }
                        }
                    } else {
                        // If no JSON block is found, return the whole text
                        jsonObject = JSON.parse(text);
                    }

                    dispatch({
                        type: 'SET_RESPONSE',
                        payload: {
                            explanation: jsonObject?.explanation || '',
                            macro: jsonObject,
                        },
                    });
                } else {
                    throw new Error('Failed to save image');
                }
            } catch (e) {
                console.error('Error saving image', e);
            }
        }
    };

    return (
        <div>
            <Dialog
                open={dialog}
                onOpenChange={(open) => !open && handleClose()}
            >
                <DialogTrigger asChild>
                    <Button type="button" onClick={() => handleOpen()}>
                        <div className="flex flex-row gap-2 items-center pointer-events-none">
                            <Upload />
                            <p>Upload</p>
                        </div>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Scan your meal.</DialogTitle>
                        <DialogDescription>
                            You can track your macros by scanning your meal.
                            Separation of meal content is a must for accuracy.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        <div className="relative flex flex-col gap-2">
                            <div>
                                {imageUrl && (
                                    <Image
                                        src={imageUrl}
                                        width={1920}
                                        height={1080}
                                        alt="Image"
                                        layout="responsive"
                                        className="w-full h-full rounded-md border"
                                    />
                                )}
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                <article className="flex flex-col gap-2">
                                    {state.explanation && (
                                        <p>{state.explanation}</p>
                                    )}
                                    {state.macro && (
                                        <ul>
                                            <li>
                                                Calories:{' '}
                                                <span className="font-semibold">
                                                    {state.macro?.calories || 0}
                                                </span>
                                            </li>
                                            <li>
                                                Protein:{' '}
                                                <span className="font-semibold">
                                                    {state.macro?.protein || 0}
                                                </span>
                                            </li>
                                            <li>
                                                Carbohydrates:{' '}
                                                <span className="font-semibold">
                                                    {state.macro?.carbohydrates
                                                        .total || 0}
                                                </span>
                                                <ul>
                                                    <li>
                                                        Fiber:{' '}
                                                        <span className="font-semibold">
                                                            {state.macro
                                                                ?.carbohydrates
                                                                .fiber || 0}
                                                        </span>
                                                    </li>
                                                    <li>
                                                        Sugars:{' '}
                                                        <span className="font-semibold">
                                                            {state.macro
                                                                ?.carbohydrates
                                                                .sugars || 0}
                                                        </span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                Fats:{' '}
                                                <span className="font-semibold">
                                                    {state.macro?.fat.total ||
                                                        0}
                                                </span>
                                                <ul>
                                                    <li>
                                                        Saturated:{' '}
                                                        <span className="font-semibold">
                                                            {state.macro?.fat
                                                                .saturated || 0}
                                                        </span>
                                                    </li>
                                                    <li>
                                                        Trans:{' '}
                                                        <span className="font-semibold">
                                                            {state.macro?.fat
                                                                .trans || 0}
                                                        </span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                Sodium:{' '}
                                                <span className="font-semibold">
                                                    {state.macro?.sodium || 0}
                                                </span>
                                            </li>
                                            <li>
                                                Cholesterol:{' '}
                                                <span className="font-semibold">
                                                    {state.macro?.cholesterol ||
                                                        0}
                                                </span>
                                            </li>
                                            <li>
                                                Serving Size:{' '}
                                                <span className="font-semibold">
                                                    {state.macro
                                                        ?.serving_size || 0}
                                                </span>
                                            </li>
                                            <li>
                                                Ingredients:{' '}
                                                <span className="font-semibold">
                                                    {state.macro?.ingredients.join(
                                                        ', ',
                                                    ) || 'N/A'}
                                                </span>
                                            </li>
                                        </ul>
                                    )}
                                </article>
                            </div>
                        </div>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-2"
                            >
                                <div className="">
                                    <FormField
                                        control={form.control}
                                        name="imageUrl"
                                        render={({ field }) => (
                                            <FormItem className="space-y-0 flex">
                                                <FormDescription className="text-red-500">
                                                    {
                                                        form.getFieldState(
                                                            'imageUrl',
                                                        ).error?.message
                                                    }
                                                </FormDescription>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        onChange={async (e) => {
                                                            const file = e
                                                                .target.files
                                                                ? e.target
                                                                      .files[0]
                                                                : null;
                                                            field.onChange(
                                                                file,
                                                            );

                                                            if (file) {
                                                                const image =
                                                                    await convertToBase64(
                                                                        file,
                                                                    );

                                                                setImageUrl(
                                                                    image,
                                                                );
                                                                dispatch({
                                                                    type: 'SET_RESPONSE',
                                                                    payload:
                                                                        initialState,
                                                                });
                                                            }
                                                        }}
                                                        className="cursor-pointer"
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col justify-end gap-2">
                                    <Button
                                        className="float-right basis-full"
                                        type="submit"
                                        disabled={imageUrl ? false : true}
                                    >
                                        Upload
                                        {form.formState.isSubmitting && (
                                            <Spinner
                                                size="small"
                                                className="text-white"
                                            />
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Uploader;
