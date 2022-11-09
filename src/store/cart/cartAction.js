import CART_ACTION_TYPES from './cartTypes';
import createAction from '../../utils/reducer/reducer.utils';
import { addCartItem, clearCartItem, removeCartItem } from './cartUtils';

export const setToggleDropdown = () => createAction(CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN, null);

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
