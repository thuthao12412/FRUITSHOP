import React, { useState, useContext, useEffect } from 'react';
import { FaUser, FaLock, FaFacebookF, FaTwitter, FaGoogle, FaLinkedinIn } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import { setCartData, setUserId } from '../stores/slices/cartSlide';
import { useDispatch } from 'react-redux';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const dispatch = useDispatch();

    useEffect(() => {
        if (authContext?.isLoggedIn) {
            navigate('/');
        }
    }, [authContext?.isLoggedIn, navigate]);

    useEffect(() => {
        const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        const savedTotalQuantity = JSON.parse(localStorage.getItem('cartTotalQuantity') || '0');
        const savedTotalPrice = JSON.parse(localStorage.getItem('cartTotalPrice') || '0');

        if (savedCartItems.length > 0 && authContext?.userId) {
            dispatch(setCartData({
                items: savedCartItems,
                totalQuantity: savedTotalQuantity,
                totalPrice: savedTotalPrice,
                userId: authContext.userId,
            }));
        }
    }, [authContext?.userId, dispatch]);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        try {
            const response = await axios.get(`http://localhost:5000/users?email=${email}&password=${password}`);
            
            if (response.data.length > 0) {
                const user = response.data[0];
                const role = user.role || 'user';
                const userId = user.id;
                const username = user.username || '';
                const phone = user.phone || '';
                const address = user.address || '';
                const password = user.password || '';
                const email = user.email || '';

                authContext?.login(
                    role,
                    'fake-jwt-token',
                    userId,
                    email,
                    username,
                    phone,
                    address,
                    password,
                    3600 // 1 hour expiry
                );

                // Fetch user cart and synchronize
                const fetchUserCart = async () => {
                    try {
                        const cartResponse = await axios.get(`http://localhost:5000/carts?userId=${userId}`);
                        if (cartResponse.data.length > 0) {
                            const cart = cartResponse.data[0];
                            dispatch(setCartData(cart));
                            localStorage.setItem('cartItems', JSON.stringify(cart.items));
                            localStorage.setItem('cartTotalQuantity', JSON.stringify(cart.totalQuantity));
                            localStorage.setItem('cartTotalPrice', JSON.stringify(cart.totalPrice));
                        }
                    } catch (error) {
                        console.error('Error fetching user cart:', error);
                    }
                };

                fetchUserCart();
                dispatch(setUserId(userId));
                navigate('/');
            } else {
                setError('Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Đã xảy ra lỗi. Vui lòng thử lại sau.');
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div className="auth-container">
            <div className="info-section">
                <h2>Bạn mới đến?</h2>
                <p>
                    Chúng tôi cung cấp các loại trái cây tươi ngon nhất từ khắp nơi, đảm bảo chất lượng và dinh dưỡng tốt nhất
                    cho bạn và gia đình.
                </p>
                <button onClick={handleRegisterRedirect} className="toggle-button">
                    ĐĂNG KÝ
                </button>
            </div>

            <div className="form-section">
                <h2>Đăng Nhập</h2>
                {error && <p className="error-message">{error}</p>}
                <form className="auth-form" onSubmit={handleLogin}>
                    <div className="input-group">
                        <FaUser className="input-icon" />
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            required
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                        />
                    </div>
                    <button type="submit" className="auth-button">
                        ĐĂNG NHẬP
                    </button>
                </form>
                <p className="social-login-text">Hoặc đăng nhập bằng mạng xã hội</p>
                <div className="social-icons">
                    <FaFacebookF className="social-icon" />
                    <FaTwitter className="social-icon" />
                    <FaGoogle className="social-icon" />
                    <FaLinkedinIn className="social-icon" />
                </div>
            </div>
        </div>
    );
};

export default Login;
