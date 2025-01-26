'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { MealForm } from '../forms/MealForm';
import { MacroMealDictionary } from '@/utils/category';
import { routes } from '@/utils/routes';

interface AddMealDialogProps {
    category: string;
}

const AddMealDialog = ({ category }: AddMealDialogProps) => {
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
            {category && (
                <Button
                    className="flex gap-2 items-center justify-center"
                    onClick={handleDialog}
                >
                    <Plus />
                    <p>Add Meal</p>
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
