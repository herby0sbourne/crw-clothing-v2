import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/Cart.Context';
import { UserProvider } from './context/User.Context';
import { CategoriesProvider } from './context/Categories.Context';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import App from './App';

import './index.scss';

const client = new ApolloClient({
    uri: 'https://crwn-clothing.com/',
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <UserProvider>
                    <CategoriesProvider>
                        <CartProvider>
                            <App />
                        </CartProvider>
                    </CategoriesProvider>
                </UserProvider>
            </BrowserRouter>
        </ApolloProvider>
    </React.StrictMode>
);
