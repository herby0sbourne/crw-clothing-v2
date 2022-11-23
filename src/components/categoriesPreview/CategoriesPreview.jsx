import { useContext } from 'react';
import Spinner from '../../components/spinner/Spinner';
import { CategoriesContext } from '../../context/Categories.Context';
import CategoryPreview from '../../components/categoryPreview/CategoryPreview';

const CategoriesPreview = () => {
    const { categoriesMap, loading } = useContext(CategoriesContext);
    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                Object.keys(categoriesMap).map((category) => {
                    const products = categoriesMap[category];
                    return <CategoryPreview key={category} category={category} products={products} />;
                })
            )}
        </>
    );
};

export default CategoriesPreview;
