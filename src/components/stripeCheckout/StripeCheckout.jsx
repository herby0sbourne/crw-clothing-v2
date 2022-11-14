import { useState } from 'react';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { ToastContainer, toast } from 'react-toastify';
import { BUTTON_TYPE_CLASSES } from '../customBtn/CustomBtn';
import { selectCartItems } from '../../store/cart/cartSelector';
import { selectCurrentUser } from '../../store/user/userSelector';
import showToastMessage from '../../utils/notification.utils';
import { FormContainer, PaymentButton, PaymentFormContainer } from './stripe-checkout.styles';

let stripePromise;

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    }

    return stripePromise;
};

const StripeCheckOut = () => {
    const cartItems = useSelector(selectCartItems);
    const currentUser = useSelector(selectCurrentUser);
    const [processingPayment, setProcessingPayment] = useState(false);

    const paymentHandler = async (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            toast.info('Cart is Empty!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        }

        setProcessingPayment(true);

        try {
            const session = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentUser: currentUser ? currentUser : 'Guest',
                    cartItems,
                }),
            }).then((res) => res.json());

            const stripe = await getStripe();

            const data = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            setProcessingPayment(false);
        } catch (error) {
            // console.log(error);
            console.log(error.message);
            showToastMessage('info', 'Payment failed...');
            setProcessingPayment(false);
        }
    };

    return (
        <>
            <PaymentFormContainer>
                <FormContainer onSubmit={paymentHandler}>
                    <h2>Stripe Checkout </h2>
                    <PaymentButton
                        isLoading={processingPayment}
                        type={'submit'}
                        buttonType={BUTTON_TYPE_CLASSES.inverted}
                    >
                        {!processingPayment ? 'Pay Now' : 'Processing...'}
                    </PaymentButton>
                </FormContainer>
            </PaymentFormContainer>
            <ToastContainer />
        </>
    );
};

export default StripeCheckOut;
