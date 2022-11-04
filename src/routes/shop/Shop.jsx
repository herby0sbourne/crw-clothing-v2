import { useContext } from 'react';
import { ProductsContext } from '../../context/Products.Context';
import ProductCard from '../../components/productCard/ProductCard';

import './shop.scss';

const Shop = () => {
    const { products } = useContext(ProductsContext);
    return (
        <div className={'products-container'}>
            {products.map((product) => {
                return <ProductCard key={product.id} product={product} />;
            })}
        </div>
    );
};

export default Shop;
