import { Meal } from '@/types/Meal';
import React from 'react';
import { MealCard } from './MealCard';

interface MealsProps {
    category?: string;
}

const meals: Meal[] = [
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
const Meals = async ({ category }: MealsProps) => {
    const randomNumber = () => Math.floor(Math.random() * 2000) + 1000;
    await new Promise((resolve) => setTimeout(resolve, randomNumber()));
    console.log(category);
    return (
        <div>
            <ul className="grid grid-cols-3 gap-3">
                {meals.map((meal, index) => (
                    <li key={index}>
                        <MealCard meal={meal} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Meals;
