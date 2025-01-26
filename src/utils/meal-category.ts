// TODO: For removal
enum MealCategory {
    PROTEINS = 'Proteins',
    CARBOHYDRATES = 'Carbohydrates',
    VEGETABLES = 'Vegetables & Greens',
    HEALTHY_FATS = 'Healthy Fats',
    DAIRY = ' Dairy & Dairy Alternatives',
}
export const MealCategoryDictionary: Record<string, string> = {
    proteins: MealCategory.PROTEINS,
    carbohydrates: MealCategory.CARBOHYDRATES,
    vegetables: MealCategory.VEGETABLES,
    fats: MealCategory.HEALTHY_FATS,
    dairy: MealCategory.DAIRY,
    default: 'No selected category',
};

export const categories = [
    'proteins',
    'carbohydrates',
    'vegetables',
    'fats',
    'dairy',
];
