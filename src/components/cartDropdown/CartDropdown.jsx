import { useContext } from 'react';
import CartItem from '../cartItem/CartItem';
import CustomBtn from '../customBtn/CustomBtn';
import { CartContext } from '../../context/Cart.Context';

import './cart-dropdown.scss';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    return (
        <div className={'cart-dropdown-container'}>
            <div className="cart-items">
                {cartItems.map((cartItem) => {
                    return <CartItem key={cartItem.id} cartItem={cartItem} />;
                })}
            </div>
            <CustomBtn>GO TO CHECKOUT</CustomBtn>
        </div>
    );
};

export default CartDropdown;
