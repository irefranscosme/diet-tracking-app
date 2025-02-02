'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog';
import { Plus, TextCursorInput } from 'lucide-react';
import { Button } from '../ui/button';
import { MealForm } from '../forms/MealForm';
import { MacroMealDictionary } from '@/utils/category';
import { routes } from '@/utils/routes';

interface AddMealDialogProps {
    category: string;
    isManual?: boolean;
}

const AddMealDialog = ({ category, isManual }: AddMealDialogProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleDialog = () => {
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    };

    return (
        <>
            {!isManual && category && (
                <Button onClick={handleDialog} type="button">
                    <div className="flex flex-row gap-2 items-center">
                        <Plus />
                        <p>Add Meal</p>
                    </div>
                </Button>
            )}
            {category && isManual && (
                <Button
                    onClick={handleDialog}
                    type="button"
                    className="flex flex-row gap-2 items-center"
                >
                    <div className="flex flex-row gap-2 items-center">
                        <TextCursorInput />
                        <p>Manual</p>
                    </div>
                </Button>
            )}
            <Dialog open={open} onOpenChange={handleDialog} modal={true}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Meal Form</DialogTitle>
                        <DialogDescription>
                            You can use this to input your macro for{' '}
                            <span className="lowercase">
                                {MacroMealDictionary[category] ||
                                    MacroMealDictionary['default']}{' '}
                            </span>
                            today.
                        </DialogDescription>
                    </DialogHeader>
                    <MealForm category={category} route={routes.meals} />
                </DialogContent>
            </Dialog>
            {/* <MealFormConfirmation
                isConfirm={isConfirm}
                setIsConfirm={(value) => handleSetIsConfirm(value)}
                values={values}
            /> */}
        </>
    );
};

export default AddMealDialog;
