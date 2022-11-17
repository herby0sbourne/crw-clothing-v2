import { CategoryItem } from '../categories/categoryTypes';
import { CartItem } from './cartTypes';

export const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

export const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
    const existingCartItem = cartItems.find((cartItem) => {
        return cartItem.id === cartItemToRemove.id;
    });

    //* remove item from cart if quantity is 1
    if (existingCartItem && existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => {
            return cartItem.id !== cartItemToRemove.id;
        });
    }

    return cartItems.map((cartItem) => {
        return cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem;
    });
};

export const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] => {
    return cartItems.filter((cartItem) => {
        return cartItem.id !== cartItemToClear.id;
    });
};
