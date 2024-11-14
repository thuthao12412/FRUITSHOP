// src/pages/AuthPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaFacebookF, FaTwitter, FaGoogle, FaLinkedinIn } from 'react-icons/fa';

const AuthPage: React.FC = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleToggleMode = () => {
        setIsLoginMode(!isLoginMode);
        setUsername('');
        setEmail('');
        setPassword('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const endpoint = isLoginMode ? '/api/users/login' : '/api/users/register';
        const payload = isLoginMode
            ? { email, password }
            : { username, email, password };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (response.ok) {
                if (isLoginMode) {
                    // Giả sử bạn lưu token và điều hướng đến trang chính hoặc trang tài khoản
                    localStorage.setItem('token', data.token);
                    navigate('/');
                } else {
                    alert('Đăng ký thành công! Vui lòng đăng nhập.');
                    handleToggleMode();
                }
            } else {
                alert(data.message || 'Có lỗi xảy ra, vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Lỗi kết nối, vui lòng thử lại.');
        }
    };

    return (
        <div className="auth-container">
            <div className={`auth-panel ${isLoginMode ? 'login-mode' : 'register-mode'}`}>
                <div className="info-section">
                    <h2>{isLoginMode ? 'Bạn mới đến?' : 'Bạn đã có tài khoản?'}</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, ex ratione.</p>
                    <button onClick={handleToggleMode} className="toggle-button">
                        {isLoginMode ? 'ĐĂNG KÝ' : 'ĐĂNG NHẬP'}
                    </button>
                </div>
                
                <div className="form-section">
                    <h2>{isLoginMode ? 'Đăng Nhập' : 'Đăng Ký'}</h2>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        {!isLoginMode && (
                            <div className="input-group">
                                <FaUser className="input-icon" />
                                <input
                                    type="text"
                                    placeholder="Tên đăng nhập"
                                    required
                                    className="input-field"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        )}
                        <div className="input-group">
                            <FaEnvelope className="input-icon" />
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
                            />
                        </div>
                        <button type="submit" className="auth-button">
                            {isLoginMode ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ'}
                        </button>
                    </form>
                    <p className="social-login-text">Hoặc {isLoginMode ? 'đăng nhập' : 'đăng ký'} bằng mạng xã hội</p>
                    <div className="social-icons">
                        <FaFacebookF className="social-icon" />
                        <FaTwitter className="social-icon" />
                        <FaGoogle className="social-icon" />
                        <FaLinkedinIn className="social-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
