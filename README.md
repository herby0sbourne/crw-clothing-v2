# Crown Clothing React App

github Link [github](https://github.com/herby0sbourne/crw-clothing-v2).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

## Stripe Payment Method

To use Stripe Payment you need the REACT_APP_STRIPE_PUBLIC_KEY and STRIPE_SECRET_KEY

## To run in Netlify

You need to set the REACT_APP_NETLIFY_SERVERLESS_FUNCTION to [True]
netlify uses Stripe paymentIntents method

## To run in Vercel

You need to set the REACT_APP_VERCEL_SERVERLESS_FUNCTION to [True]
Vercel uses Stripe Checkout Session method

