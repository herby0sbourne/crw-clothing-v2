import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Category from '../../components/category/Category';
import { setCategories } from '../../store/categories/categoryAction';
import { getCollectionAndDocuments } from '../../utils/firebase/firebase.utils';
import CategoriesPreview from '../../components/categoriesPreview/CategoriesPreview';

import './shop.scss';

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const categoriesArray = await getCollectionAndDocuments();

            dispatch(setCategories(categoriesArray));
        })();
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
};

export default Shop;
