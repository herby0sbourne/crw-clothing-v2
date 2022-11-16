import { createSelector } from 'reselect';
import { CategoriesState } from './categoryReducer';
import { CategoryMap } from './categoryTypes';

const selectCategoryReducer = (state): CategoriesState => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (category): CategoryMap =>
        category.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
);

// export const selectCategoriesMap = (state) =>
//     state.categories.categories.reduce((acc, category) => {
//         const { title, items } = category;
//         acc[title.toLowerCase()] = items;
//         return acc;
//     }, {});
