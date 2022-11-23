import { createSelector } from 'reselect';
import { CartState } from './cartReducer';
import { RootSate } from '../store';

const selectCartReducer = (state: RootSate): CartState => state.cart;

export const selectCartItems = createSelector([selectCartReducer], (cart) => cart.cartItems);

export const toggleCartDropdown = createSelector([selectCartReducer], (cart) => cart.toggleDropdown);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
    cartItems.reduce((total, cartItem) => {
        return total + cartItem.quantity;
    }, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
    cartItems.reduce((total, cartItem) => {
        return total + cartItem.quantity * cartItem.price;
    }, 0)
);
