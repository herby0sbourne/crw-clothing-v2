import './checkoutItem.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cartAction';
import { selectCartItems } from '../../store/cart/cartSelector';

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const deleteItemFromCart = () => dispatch(clearItemFromCart(cartItems, cartItem));
    const increaseCartItem = () => dispatch(addItemToCart(cartItems, cartItem));
    const decreaseCartItem = () => dispatch(removeItemFromCart(cartItems, cartItem));

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
