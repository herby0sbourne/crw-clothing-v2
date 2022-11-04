import CustomBtn from '../customBtn/CustomBtn';

import './cart-dropdown.scss';

const CartDropdown = () => {
    return (
        <div className={'cart-dropdown-container'}>
            <div className="cart-item"></div>
            <CustomBtn>GO TO CHECKOUT</CustomBtn>
        </div>
    );
};

export default CartDropdown;
