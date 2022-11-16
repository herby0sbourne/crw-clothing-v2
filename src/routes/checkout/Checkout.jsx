import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../../stripe/stripe';
import { setToggleDropdown } from '../../store/cart/cartAction';
import { selectCartItems, selectCartTotal } from '../../store/cart/cartSelector';

import PaymentForm from '../../components/paymentForm/PaymentForm';
import CheckoutItem from '../../components/checkoutitem/CheckoutItem';
import StripeCheckOut from '../../components/stripeCheckout/StripeCheckout';

import './checkout.scss';

const Checkout = () => {
    const dispatch = useDispatch();
    const totalCost = useSelector(selectCartTotal);
    const cartItems = useSelector(selectCartItems);

    useEffect(() => {
        dispatch(setToggleDropdown(false));
        // eslint-disable-next-line
    }, []);

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map((cartItem) => {
                return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
            })}
            <span className="total">Total: ${totalCost}</span>
            {process.env.REACT_APP_NETLIFY_SERVERLESS_FUNCTION && (
                <Elements stripe={stripePromise}>
                    <PaymentForm />
                </Elements>
            )}
            {process.env.REACT_APP_VERCEL_SERVERLESS_FUNCTION && <StripeCheckOut />}
        </div>
    );
};

export default Checkout;
