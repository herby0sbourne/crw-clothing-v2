import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from '../../context/User.Context';
import { CartContext } from '../../context/Cart.Context';
import CartIcon from '../../components/cartIcon/CartIcon';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartDropdown from '../../components/cartDropdown/CartDropdown';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';

import './navigation.scss';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { toggleDropdown } = useContext(CartContext);

    return (
        <>
            <div className="navigation">
                <Link to={'/'} className="logo-container">
                    <CrownLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link to={'/shop'} className="nav-link">
                        SHOP
                    </Link>
                    {currentUser ? (
                        <span className="nav-link" onClick={signOutUser}>
                            SIGN OUT
                        </span>
                    ) : (
                        <Link to={'/auth'} className="nav-link">
                            SIGN IN
                        </Link>
                    )}
                    <CartIcon />
                </div>
                {toggleDropdown && <CartDropdown />}
            </div>
            <Outlet />
        </>
    );
};

export default Navigation;
