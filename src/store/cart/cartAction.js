import CART_ACTION_TYPES from './cartTypes';
import createAction from '../../utils/reducer/reducer.utils';

export const setToggleDropdown = () => createAction(CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN, null);

const addCartItem = (cartItems, productToAdd) => {
    //* find if productToAdd{} is already in cartItems[]
    const existingCartItem = cartItems.find((cartItem) => {
        return cartItem.id === productToAdd.id;
    });

    //* if found increase quantity by 1
    if (existingCartItem) {
        return cartItems.map((cartItem) => {
            return cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem;
        });
    }

    //* return new array with modified cartItem or new cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => {
        return cartItem.id === cartItemToRemove.id;
    });

    //* remove item from cart if quantity is 1
    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => {
            return cartItem.id !== cartItemToRemove.id;
        });
    }

    return cartItems.map((cartItem) => {
        return cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem;
    });
};

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => {
        return cartItem.id !== cartItemToClear.id;
    });
};

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
