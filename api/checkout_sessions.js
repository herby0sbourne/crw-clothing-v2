require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default function handler(req, res) {
    const { name = 'World' } = req.query;
<<<<<<< HEAD
    return res.send({ name });
=======
    return res.send(`Hello ${name}!`);
>>>>>>> 2358e13315aca169a6347895e9d75239746f536a
}
