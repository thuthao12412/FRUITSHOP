import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../stores/slices/cartSlide';

interface AuthContextType {
    isLoggedIn: boolean;
    role: 'user' | 'admin' | null;
    token: string | null;
    userId: string | null;
    email: string | null;
    username: string | null;
    phone: string | null;
    address: string | null;
    joinedDate: string | null; // Thêm joinedDate
    password: string | null; // Thêm password
    login: (
        userRole: 'user' | 'admin',
        userToken: string,
        userId: string,
        userEmail: string,
        username: string,
        phone: string,
        address: string,
        joinedDate: string,
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
    const [joinedDate, setJoinedDate] = useState<string | null>(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const savedData = {
            token: localStorage.getItem('token'),
            role: localStorage.getItem('role') as 'user' | 'admin' | null,
            userId: localStorage.getItem('userId'),
            email: localStorage.getItem('email'),
            username: localStorage.getItem('username'),
            phone: localStorage.getItem('phone'),
            address: localStorage.getItem('address'),
            joinedDate: localStorage.getItem('joinedDate'),
            tokenExpiry: localStorage.getItem('tokenExpiry'),
        };

        if (savedData.token && savedData.role && savedData.userId && savedData.email && savedData.username && savedData.phone && savedData.address && savedData.tokenExpiry) {
            const isExpired = new Date().getTime() > parseInt(savedData.tokenExpiry, 10);
            if (isExpired) {
                console.log('Token expired. Logging out.');
                logout();
            } else {
                setToken(savedData.token);
                setRole(savedData.role);
                setUserId(savedData.userId);
                setEmail(savedData.email);
                setUsername(savedData.username);
                setPhone(savedData.phone);
                setAddress(savedData.address);
                setJoinedDate(savedData.joinedDate || new Date().toISOString().split('T')[0]); // Nếu không có joinedDate, sử dụng ngày hiện tại
                setIsLoggedIn(true);
            }
        }
    }, []);

    const login = (
        userRole: 'user' | 'admin',
        userToken: string,
        userId: string,
        userEmail: string,
        username: string,
        phone: string,
        address: string,
        joinedDate: string,
        expiresIn: number
    ) => {
        const expiryTime = new Date().getTime() + expiresIn * 1000;
        setIsLoggedIn(true);
        setRole(userRole);
        setToken(userToken);
        setUserId(userId);
        setEmail(userEmail);
        setUsername(username);
        setPhone(phone);
        setAddress(address);
        setJoinedDate(joinedDate);

        localStorage.setItem('token', userToken);
        localStorage.setItem('role', userRole);
        localStorage.setItem('userId', userId);
        localStorage.setItem('email', userEmail);
        localStorage.setItem('username', username);
        localStorage.setItem('phone', phone);
        localStorage.setItem('address', address);
        localStorage.setItem('joinedDate', joinedDate);
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
        setJoinedDate(null);

        const keysToRemove = [
            'token',
            'role',
            'userId',
            'email',
            'username',
            'phone',
            'address',
            'joinedDate',
            'cartItems',
            'cartTotalQuantity',
            'cartTotalPrice',
            'tokenExpiry',
        ];
        keysToRemove.forEach((key) => localStorage.removeItem(key));
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                role,
                token,
                userId,
                email,
                username,
                phone,
                address,
                joinedDate, // Truyền joinedDate vào context
                password: null, // Password không được lưu trữ ở đây, cần được xử lý thông qua API
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
