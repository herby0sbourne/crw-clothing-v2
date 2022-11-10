import { useSelector } from 'react-redux';
import Spinner from './../spinner/Spinner';
import CategoryPreview from '../../components/categoryPreview/CategoryPreview';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/categorySelector';

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    return (
        <>
            {isLoading ? (
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
