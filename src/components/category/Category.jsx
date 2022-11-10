import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from './../spinner/Spinner';
import ProductCard from '../productCard/ProductCard';
import { selectCategoriesMap } from '../../store/categories/categorySelector';
import { selectCategoriesIsLoading } from '../../store/categories/categorySelector';

import './category.scss';

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <>
            <h2 className="category-title">{category.toUpperCase()}</h2>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="category-container">
                    {products &&
                        products.map((product) => {
                            return <ProductCard key={product.id} product={product} />;
                        })}
                </div>
            )}
        </>
    );
};

export default Category;
