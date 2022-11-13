import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { stripePromise } from './stripe/stripe';
import { Elements } from '@stripe/react-stripe-js';

import App from './App';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <Elements stripe={stripePromise}>
                        <App />
                    </Elements>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
