import { createContext, useState } from 'react';

export const CartContext = createContext({
    toggleDropdown: false,
    setToggleDropdown: () => null,
});

export const CartProvider = ({ children }) => {
    const [toggleDropdown, setToggleDropdown] = useState(false);

    const value = { toggleDropdown, setToggleDropdown };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

CartContext.displayName = 'Cart_Context';
