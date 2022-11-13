import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { BUTTON_TYPE_CLASSES } from '../customBtn/CustomBtn';
import { selectCartTotal } from '../../store/cart/cartSelector';
import { selectCurrentUser } from '../../store/user/userSelector';
import { FormContainer, PaymentButton, PaymentFormContainer } from './payment-form.styles';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const cartTotal = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [processingPayment, setProcessingPayment] = useState(false);

    const paymentHandler = async (e) => {
        e.preventDefault();

        const vercelTest = await fetch('/api/checkout_sessions').then((res) => res.json());
        console.log(vercelTest);
        if (!stripe || !elements) {
            return;
        }

        // setProcessingPayment(true);

        // const response = await fetch('/.netlify/functions/create-payment-intent', {
        //     method: 'post',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ amount: cartTotal * 100 }),
        // }).then((res) => res.json());

        // const clientSecret = response.paymentIntent.client_secret;

        // const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        //     payment_method: {
        //         card: elements.getElement(CardElement),
        //         billing_details: {
        //             name: currentUser ? currentUser.displayName : 'Guest',
        //         },
        //     },
        // });

        // setProcessingPayment(false);

        // if (paymentResult.error) {
        //     console.log(paymentResult.error);
        //     alert(paymentResult.error.message);
        // } else {
        //     if (paymentResult.paymentIntent.status === 'succeeded') {
        //         alert('payment success');
        //     }
        // }
    };

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <PaymentButton isLoading={processingPayment} type={'submit'} buttonType={BUTTON_TYPE_CLASSES.inverted}>
                    {!processingPayment ? 'Pay Now' : 'Processing...'}
                </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;
