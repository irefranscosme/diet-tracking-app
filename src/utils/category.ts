enum MealCategory {
    BREAKFAST = 'Breakfast',
    LUNCH = 'Lunch',
    DINNER = 'Dinner',
    SNACK = 'Snack',
}

enum MacroCategory {
    PROTEINS = 'Proteins',
    CARBOHYDRATES = 'Carbohydrates',
    VEGETABLES = 'Vegetables & Greens',
    HEALTHY_FATS = 'Healthy Fats',
    DAIRY = ' Dairy & Dairy Alternatives',
}

export const MacroMealDictionary: Record<string, string> = {
    'break-fast': MealCategory.BREAKFAST,
    lunch: MealCategory.LUNCH,
    dinner: MealCategory.DINNER,
    snack: MealCategory.SNACK,
    proteins: MacroCategory.PROTEINS,
    carbohydrates: MacroCategory.CARBOHYDRATES,
    vegetables: MacroCategory.VEGETABLES,
    fats: MacroCategory.HEALTHY_FATS,
    dairy: MacroCategory.DAIRY,
    default: 'No selected category',
};
