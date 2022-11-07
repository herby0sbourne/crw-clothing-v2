import { useContext } from 'react';
import CartItem from '../cartItem/CartItem';
import CustomBtn from '../customBtn/CustomBtn';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../context/Cart.Context';
import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';

const CartDropdown = () => {
    const navigate = useNavigate();
    const { cartItems } = useContext(CartContext);

    const goToCheckout = () => {
        navigate('checkout');
    };

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map((cartItem) => {
                        return <CartItem key={cartItem.id} cartItem={cartItem} />;
                    })
                ) : (
                    <EmptyMessage>Your Cart is Empty</EmptyMessage>
                )}
            </CartItems>
            <CustomBtn onClick={goToCheckout}>GO TO CHECKOUT</CustomBtn>
        </CartDropdownContainer>
    );
};

export default CartDropdown;
