import { useContext } from 'react';
import CustomBtn from '../customBtn/CustomBtn';
import { CartContext } from '../../context/Cart.Context';

import './productcard.scss';

const ProductCard = ({ product }) => {
    const { addItemToCart } = useContext(CartContext);
    const { name, imageUrl, price } = product;

    const addProductToCart = () => addItemToCart(product);

    return (
        <div className={'product-card-container'}>
            <img src={imageUrl} alt={name} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <CustomBtn buttonType={'inverted'} onClick={addProductToCart}>
                Add to cart
            </CustomBtn>
        </div>
    );
};

export default ProductCard;
