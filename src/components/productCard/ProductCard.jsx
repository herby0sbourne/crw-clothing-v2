import { useContext } from 'react';
import { CartContext } from '../../context/Cart.Context';
import CustomBtn, { BUTTON_TYPE_CLASSES } from '../customBtn/CustomBtn';

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
            <CustomBtn buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>
                Add to cart
            </CustomBtn>
        </div>
    );
};

export default ProductCard;
