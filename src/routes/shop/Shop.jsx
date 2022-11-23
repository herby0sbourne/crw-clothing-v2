import { Route, Routes } from 'react-router-dom';
import Category from '../../components/category/Category';
import CategoriesPreview from '../../components/categoriesPreview/CategoriesPreview';

import './shop.scss';

const Shop = () => {
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
};

export default Shop;
