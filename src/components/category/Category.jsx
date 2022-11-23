import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import ProductCard from '../productCard/ProductCard';
import Spinner from '../spinner/Spinner';

import './category.scss';

const GET_CATEGORY = gql`
    query GetCollectionsByTitle($title: String) {
        getCollectionsByTitle(title: $title) {
            id
            title
            items {
                id
                name
                price
                imageUrl
            }
        }
    }
`;

// const SET_CATEGORY = gql`
//     mutation ($category: category!) {
//         addCategory(category: $category) {
//             id
//             title
//             items {
//                 id
//                 name
//                 price
//                 imageUrl
//             }
//         }
//     }
// `;

const Category = () => {
    const { category } = useParams();
    const { loading, error, data } = useQuery(GET_CATEGORY, { variables: { title: category } });
    // const [addCategory, { loading, error, data }] = useMutation(SET_CATEGORY);
    // addCategory({ variables: { category: 'categoryObject' } });
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (data) {
            const {
                getCollectionsByTitle: { items },
            } = data;
            setProducts(items);
        }
    }, [category, data]);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <h2 className="category-title">{category.toUpperCase()}</h2>
                    <div className="category-container">
                        {products &&
                            products.map((product) => {
                                return <ProductCard key={product.id} product={product} />;
                            })}
                    </div>
                </>
            )}
        </>
    );
};

export default Category;
