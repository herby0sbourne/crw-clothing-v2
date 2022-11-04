import { createContext, useState } from 'react';
import PRODUCTS from '../shopData.json';

export const ProductsContext = createContext({
    products: [],
    setProducts: () => {},
});

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(PRODUCTS);

    const value = { products, setProducts };
    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};

ProductsContext.displayName = 'Products_Context';
