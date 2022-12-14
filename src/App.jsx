import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkUserSession } from './store/user/userAction';

import Home from './routes/home/Home';
import Shop from './routes/shop/Shop';
import Checkout from './routes/checkout/Checkout';
import Navigation from './routes/navigation/Navigation';
import Authentication from './routes/authentication/Authentication';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserSession());
        // eslint-disable-next-line
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path="shop/*" element={<Shop />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="auth" element={<Authentication />} />
            </Route>
        </Routes>
    );
};

export default App;
