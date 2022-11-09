import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from '../cartItem/CartItem';
import CustomBtn from '../customBtn/CustomBtn';
import { selectCartItems } from '../../store/cart/cartSelector';
import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';

const CartDropdown = () => {
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems);

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
            <CustomBtn onClick={goToCheckout}>CHECKOUT</CustomBtn>
        </CartDropdownContainer>
    );
};

export default CartDropdown;
