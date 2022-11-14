require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    try {
        const { currentUser, cartItems } = req.body;

        let customer;
        let metadata;

        if (typeof currentUser !== 'string') {
            customer = await stripe.customers.create({
                name: currentUser.displayName,
                email: currentUser.email,
                metadata: {
                    userId: currentUser.id,
                    cart: JSON.stringify(cartItems),
                },
            });
        } else {
            metadata = {
                currentUser,
                guestId: Date.now().toString(),
            };
        }

        const line_items = cartItems.map((item) => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: [item.imageUrl],
                        // description: item.desc,
                        metadata: {
                            id: item.id,
                        },
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            };
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0,
                            currency: 'usd',
                        },
                        display_name: 'Free shipping',
                        // Delivers between 5-7 business days
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 5,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 7,
                            },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 1500,
                            currency: 'usd',
                        },
                        display_name: 'Next day air',
                        // Delivers in exactly 1 business day
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 1,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 1,
                            },
                        },
                    },
                },
            ],
            metadata,
            mode: 'payment',
            customer: customer?.id,
            payment_method_types: ['card'],
            client_reference_id: currentUser?.id,
            // customer_email: currentUser?.email,
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/checkout`,
        });

        // res.redirect(303, session.url);
        return res.status(200).send(session);
    } catch (error) {
        res.status(400).send(error);
    }
}
