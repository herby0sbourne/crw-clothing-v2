import CART_ACTION_TYPES from './cartTypes';

export const INITIAL_STATE = {
    cartItems: [],
    toggleDropdown: false,
};

export const cartReducer = (state = INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload,
            };

        case CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN:
            return {
                ...state,
                toggleDropdown: payload,
            };

        default:
            return state;
    }
};
