import { useContext } from 'react';
import { CartContext } from '../../context/Cart.Context';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.scss';

const CartIcon = () => {
    const { toggleDropdown, setToggleDropdown, totalItems } = useContext(CartContext);
    const toggleCartIcon = () => setToggleDropdown(!toggleDropdown);
    return (
        <div className={'cart-icon-container'} onClick={toggleCartIcon}>
            <ShoppingIcon className={'shopping-icon'} />
            <span className={'item-count'}>{totalItems}</span>
        </div>
    );
};

export default CartIcon;
