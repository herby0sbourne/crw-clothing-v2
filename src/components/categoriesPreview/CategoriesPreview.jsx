import { useSelector } from 'react-redux';
import CategoryPreview from '../../components/categoryPreview/CategoryPreview';
import { selectCategoriesMap } from '../../store/categories/categorySelector';

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);

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
