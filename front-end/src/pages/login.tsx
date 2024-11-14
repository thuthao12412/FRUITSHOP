import React, { useState, useContext } from 'react';
import { FaUser, FaLock, FaFacebookF, FaTwitter, FaGoogle, FaLinkedinIn } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.get(`http://localhost:5000/users?email=${email}&password=${password}`);

            if (response.data.length > 0) {
                const user = response.data[0];
                const role = user.role || 'user';  // Assuming role is saved in db.json
    
                authContext?.login(role, 'fake-jwt-token');  // Simulating a login
                alert(`Đăng nhập thành công với vai trò ${role}`);
                navigate('/');
            } else {
                alert('Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };
    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div className="auth-container">
            <div className="info-section">
                <h2>Bạn mới đến?</h2>
                <p>Chúng tôi cung cấp các loại trái cây tươi ngon nhất từ khắp nơi, đảm bảo chất lượng và dinh dưỡng tốt nhất cho bạn và gia đình.</p>
                <button onClick={handleRegisterRedirect} className="toggle-button">ĐĂNG KÝ</button>
            </div>
            
            <div className="form-section">
                <h2>Đăng Nhập</h2>
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
                        />
                    </div>
                    <button type="submit" className="auth-button">ĐĂNG NHẬP</button>
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
