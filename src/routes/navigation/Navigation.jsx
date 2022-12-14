import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import CartIcon from '../../components/cartIcon/CartIcon';
import CartDropdown from '../../components/cartDropdown/CartDropdown';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { signOutStart } from '../../store/user/userAction';
import { selectCurrentUser } from '../../store/user/userSelector';
import { toggleCartDropdown } from '../../store/cart/cartSelector';
import { LogoContainer, NavigationContainer, NavLink, NavLinks } from './navigation.styles.jsx';

const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const toggleDropdown = useSelector(toggleCartDropdown);

    const signOutUser = () => {
        dispatch(signOutStart());
    };

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
