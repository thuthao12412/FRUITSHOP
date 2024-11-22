import React, { createContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { clearCart } from '../stores/slices/cartSlide';
import { useDispatch } from 'react-redux';

interface AuthContextType {
    isLoggedIn: boolean;
    role: 'user' | 'admin' | null;
    token: string | null;
    userId: string | null;
    email: string | null;
    username: string | null;
    phone: string | null;
    address: string | null;
    login: (
        userRole: 'user' | 'admin',
        userToken: string,
        userId: string,
        userEmail: string,
        username: string,
        phone: string,
        address: string,
        expiresIn: number
    ) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState<'user' | 'admin' | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [phone, setPhone] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedRole = localStorage.getItem('role') as 'user' | 'admin' | null;
        const savedUserId = localStorage.getItem('userId');
        const savedEmail = localStorage.getItem('email');
        const savedUsername = localStorage.getItem('username');
        const savedPhone = localStorage.getItem('phone');
        const savedAddress = localStorage.getItem('address');
        const expiry = localStorage.getItem('tokenExpiry');

        if (savedToken && savedRole && savedUserId && savedEmail && savedUsername && savedPhone && savedAddress && expiry) {
            const isExpired = new Date().getTime() > parseInt(expiry, 10);
            if (isExpired) {
                console.log('Token expired. Logging out.');
                logout();
            } else {
                setToken(savedToken);
                setRole(savedRole);
                setUserId(savedUserId);
                setEmail(savedEmail);
                setUsername(savedUsername);
                setPhone(savedPhone);
                setAddress(savedAddress);
                setIsLoggedIn(true);
            }
        }
    }, []);

    const login = (userRole: 'user' | 'admin', userToken: string, userId: string, userEmail: string, username: string, phone: string, address: string, expiresIn: number) => {
        const expiryTime = new Date().getTime() + expiresIn * 1000;
        setIsLoggedIn(true);
        setRole(userRole);
        setToken(userToken);
        setUserId(userId);
        setEmail(userEmail);
        setUsername(username);
        setPhone(phone);
        setAddress(address);
        localStorage.setItem('token', userToken);
        localStorage.setItem('role', userRole);
        localStorage.setItem('userId', userId);
        localStorage.setItem('email', userEmail);
        localStorage.setItem('username', username);
        localStorage.setItem('phone', phone);
        localStorage.setItem('address', address);
        localStorage.setItem('tokenExpiry', expiryTime.toString());
    };

    const logout = () => {
        try {
            dispatch(clearCart());
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
        setIsLoggedIn(false);
        setRole(null);
        setToken(null);
        setUserId(null);
        setEmail(null);
        setUsername(null);
        setPhone(null);
        setAddress(null);

        const keysToRemove = ['token', 'role', 'userId', 'email', 'username', 'phone', 'address', 'cartItems', 'cartTotalQuantity', 'cartTotalPrice', 'tokenExpiry'];
        keysToRemove.forEach((key) => localStorage.removeItem(key));
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, role, token, userId, email, username, phone, address, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
