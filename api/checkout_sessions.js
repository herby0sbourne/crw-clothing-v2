require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default function handler(req, res) {
    const { name = 'World' } = req.query;
    return res.send({ name });
}
