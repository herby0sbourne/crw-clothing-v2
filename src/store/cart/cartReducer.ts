import { AnyAction } from 'redux';
import { CartItem } from './cartTypes';
import { setCartitems, setToggleDropdown } from '../cart/cartAction';

export type CartState = {
    readonly cartItems: CartItem[];
    readonly toggleDropdown: boolean;
};

export const INITIAL_STATE: CartState = {
    cartItems: [],
    toggleDropdown: false,
};

export const cartReducer = (state = INITIAL_STATE, action: AnyAction): CartState => {
    if (setToggleDropdown.match(action)) {
        return { ...state, toggleDropdown: action.payload };
    }

    if (setCartitems.match(action)) {
        return { ...state, cartItems: action.payload };
    }

    return state;
};
