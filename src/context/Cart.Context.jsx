import { createContext, useState, useEffect } from 'react';

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

export const CartProvider = ({ children }) => {
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    };

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    };

    useEffect(() => {
        const newTotalItems = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity;
        }, 0);
        setTotalItems(newTotalItems);
    }, [cartItems]);

    useEffect(() => {
        const cartTotal = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity * cartItem.price;
        }, 0);
        setTotalCost(cartTotal);
    }, [cartItems]);

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
