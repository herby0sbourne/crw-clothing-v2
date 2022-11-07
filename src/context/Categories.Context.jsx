import { createContext, useState, useEffect } from 'react';
import { getCollectionAndDocuments } from '../utils/firebase/firebase.utils.js';

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        (async () => {
            const categoryMap = await getCollectionAndDocuments();
            setCategoriesMap(categoryMap);
        })();
    }, []);

    const value = { categoriesMap };
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};

CategoriesContext.displayName = 'Categories_Context';
