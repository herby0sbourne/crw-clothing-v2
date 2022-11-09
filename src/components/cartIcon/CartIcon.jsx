import {useDispatch, useSelector} from 'react-redux';
import {setToggleDropdown} from '../../store/cart/cartAction';
import {selectCartCount} from '../../store/cart/cartSelector';
import {CartIconContainer, ShoppingIcon, ItemCount} from './cart-icon.styles';

const CartIcon = () => {
    const dispatch = useDispatch();
    const totalItems = useSelector(selectCartCount);

    const toggleCartIcon = () => dispatch(setToggleDropdown());

    return (
        <CartIconContainer onClick={toggleCartIcon}>
            <ShoppingIcon/>
            <ItemCount>{totalItems}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;
