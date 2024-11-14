import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    role: 'user' | 'admin' | null;
    token: string | null;
    login: (userRole: 'user' | 'admin', token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState<'user' | 'admin' | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Load token and role from localStorage on initial load
        const savedToken = localStorage.getItem('token');
        const savedRole = localStorage.getItem('role') as 'user' | 'admin' | null;
        
        if (savedToken && savedRole) {
            setToken(savedToken);
            setRole(savedRole);
            setIsLoggedIn(true);
        }
    }, []);

    const login = (userRole: 'user' | 'admin', userToken: string) => {
        setIsLoggedIn(true);
        setRole(userRole);
        setToken(userToken);
        localStorage.setItem('token', userToken);
        localStorage.setItem('role', userRole);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setRole(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, role, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
