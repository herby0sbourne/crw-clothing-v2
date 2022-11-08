import { createContext, useReducer } from 'react';
import createAction from '../utils/reducer/reducer.utils';

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

export const CartContext = createContext({
    cartItems: [],
    totalItems: 0,
    totalCost: 0,
    toggleDropdown: false,
    setToggleDropdown: () => {},
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
});

const CART_ACTION_TYPES = {
    TOGGLE_CART_DROPDOWN: 'TOGGLE_CART_DROPDOWN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
};

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };

        case CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN:
            return {
                ...state,
                toggleDropdown: !state.toggleDropdown,
            };

        default:
            throw new Error(`Unknown action type ${type} in cartReducer`);
    }
};

const INITIAL_STATE = {
    cartItems: [],
    totalItems: 0,
    totalCost: 0,
    toggleDropdown: false,
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const { cartItems, toggleDropdown, totalItems, totalCost } = state;

    const setToggleDropdown = () => {
        dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN));
    };

    const updateCartItemsReducer = (newCartItems) => {
        const newTotalItems = newCartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity;
        }, 0);

        const newCartTotal = newCartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity * cartItem.price;
        }, 0);

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                totalItems: newTotalItems,
                totalCost: newCartTotal,
            })
        );
    };

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    };

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    };

    const value = {
        toggleDropdown,
        cartItems,
        totalCost,
        totalItems,
        setToggleDropdown,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

CartContext.displayName = 'Cart_Context';
