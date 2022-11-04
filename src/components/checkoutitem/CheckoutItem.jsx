import './checkoutItem.scss';
import { useContext } from 'react';
import { CartContext } from '../../context/Cart.Context';

const CheckoutItem = ({ cartItem }) => {
    const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);
    const { name, imageUrl, price, quantity } = cartItem;

    const deleteItemFromCart = () => clearItemFromCart(cartItem);
    const increaseCartItem = () => addItemToCart(cartItem);
    const decreaseCartItem = () => removeItemFromCart(cartItem);

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={decreaseCartItem}>
                    &#10094;
                </div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={increaseCartItem}>
                    &#10095;
                </div>
            </span>
            <span className="price">{price}</span>
            <div className="remove-button" onClick={deleteItemFromCart}>
                &#10005;
            </div>
        </div>
    );
};

export default CheckoutItem;
