import { CategoryItem } from '../categories/categoryTypes';

export enum CART_ACTION_TYPES {
    SET_CART_ITEMS = 'cart/SET_CART_ITEMS',
    SET_CART_COUNT = 'cart/SET_CART_COUNT',
    SET_CART_TOTAL = 'cart/SET_CART_TOTAL',
    TOGGLE_CART_DROPDOWN = 'cart/TOGGLE_CART_DROPDOWN',
}

export type CartItem = CategoryItem & {
    quantity: number;
};
