import { useSelector } from 'react-redux';
import CheckoutItem from '../../components/checkoutitem/CheckoutItem';
import { selectCartItems, selectCartTotal } from '../../store/cart/cartSelector';

import './checkout.scss';

const Checkout = () => {
    const totalCost = useSelector(selectCartTotal);
    const cartItems = useSelector(selectCartItems);

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map((cartItem) => {
                return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
            })}
            <span className="total">Total: ${totalCost}</span>
        </div>
    );
};

export default Checkout;
