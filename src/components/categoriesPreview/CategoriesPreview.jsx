import { useContext } from 'react';
import { CategoriesContext } from '../../context/Categories.Context';
import CategoryPreview from '../../components/categoryPreview/CategoryPreview';

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);
    return (
        <>
            {Object.keys(categoriesMap).map((category) => {
                const products = categoriesMap[category];
                return <CategoryPreview key={category} category={category} products={products} />;
            })}
        </>
    );
};

export default CategoriesPreview;
