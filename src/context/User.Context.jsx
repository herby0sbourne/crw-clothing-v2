import { createContext, useState, useEffect } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangeListener } from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
    currentUser: null,
    setCurrentsUser: () => null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentsUser] = useState(null);
    const value = { currentUser, setCurrentsUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangeListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            console.log(user);
            setCurrentsUser(user);
        });

        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserContext.displayName = 'UserContext';
