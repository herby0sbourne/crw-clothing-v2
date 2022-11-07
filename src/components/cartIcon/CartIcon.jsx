import { useContext } from 'react';
import { CartContext } from '../../context/Cart.Context';

import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
    const { toggleDropdown, setToggleDropdown, totalItems } = useContext(CartContext);
    const toggleCartIcon = () => setToggleDropdown(!toggleDropdown);

    return (
        <CartIconContainer onClick={toggleCartIcon}>
            <ShoppingIcon />
            <ItemCount>{totalItems}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;
