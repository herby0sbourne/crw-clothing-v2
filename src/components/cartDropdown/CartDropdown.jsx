import { useContext } from 'react';
import CartItem from '../cartItem/CartItem';
import CustomBtn from '../customBtn/CustomBtn';
import { CartContext } from '../../context/Cart.Context';

import './cart-dropdown.scss';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
    const navigate = useNavigate();
    const { cartItems } = useContext(CartContext);

    const goToCheckout = () => {
        navigate('checkout');
    };

    return (
        <div className={'cart-dropdown-container'}>
            <div className="cart-items">
                {cartItems.map((cartItem) => {
                    return <CartItem key={cartItem.id} cartItem={cartItem} />;
                })}
            </div>
            <CustomBtn onClick={goToCheckout}>GO TO CHECKOUT</CustomBtn>
        </div>
    );
};

export default CartDropdown;
