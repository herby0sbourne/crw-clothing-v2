import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import ProductCard from '../productCard/ProductCard';
import { CategoriesContext } from '../../context/Categories.Context';
import './category.scss';

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <>
            <h2 className="category-title">{category.toUpperCase()}</h2>
            <div className="category-container">
                {products &&
                    products.map((product) => {
                        return <ProductCard key={product.id} product={product} />;
                    })}
            </div>
        </>
    );
};

export default Category;
