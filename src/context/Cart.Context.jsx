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

export const CartContext = createContext({
    cartItems: [],
    totalItems: 0,
    toggleDropdown: false,
    setToggleDropdown: () => {},
    addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    useEffect(() => {
        const newTotalItems = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity;
        }, 0);
        setTotalItems(newTotalItems);
    }, [cartItems]);

    const value = { toggleDropdown, cartItems, totalItems, setToggleDropdown, addItemToCart };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

CartContext.displayName = 'Cart_Context';
