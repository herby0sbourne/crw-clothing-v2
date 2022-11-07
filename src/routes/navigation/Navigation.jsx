import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { UserContext } from '../../context/User.Context';
import { CartContext } from '../../context/Cart.Context';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import CartIcon from '../../components/cartIcon/CartIcon';
import CartDropdown from '../../components/cartDropdown/CartDropdown';

import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { LogoContainer, NavigationContainer, NavLink, NavLinks } from './navigation.styles.jsx';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { toggleDropdown } = useContext(CartContext);

    return (
        <>
            <NavigationContainer className="navigation">
                <LogoContainer to={'/'}>
                    <CrownLogo className="logo" />
                </LogoContainer>
                <NavLinks>
                    <NavLink to={'/shop'}>SHOP</NavLink>
                    {currentUser ? (
                        <NavLink onClick={signOutUser}>SIGN OUT</NavLink>
                    ) : (
                        <NavLink to={'/auth'}>SIGN IN</NavLink>
                    )}
                    <CartIcon />
                </NavLinks>
                {toggleDropdown && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </>
    );
};

export default Navigation;
