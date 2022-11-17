import { CartItem, CART_ACTION_TYPES } from './cartTypes';
import { CategoryItem } from '../categories/categoryTypes';
import { addCartItem, clearCartItem, removeCartItem } from './cartUtils';
import { createAction, ActionWithPayload, withMatcher } from '../../utils/reducer/reducer.utils';

export type SetToggleDropdown = ActionWithPayload<CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN, boolean>;
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setToggleDropdown = withMatcher((boolean: boolean): SetToggleDropdown => {
    return createAction(CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN, boolean);
});

export const setCartitems = withMatcher((cartItems: CartItem[]): SetCartItems => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);
});

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartitems(newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return setCartitems(newCartItems);
};

export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CartItem) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return setCartitems(newCartItems);
};
