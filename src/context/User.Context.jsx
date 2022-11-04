const { createContext, useState } = require('react');

export const UserContext = createContext({
    currentUser: null,
    setCurrentsUser: () => null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentsUser] = useState(null);
    const value = { currentUser, setCurrentsUser };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserContext.displayName = 'UserContext';
