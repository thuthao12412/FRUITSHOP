import React, { useState, useContext } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { AuthContext } from '../context/authContext';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrorMessage(null);

        try {
            const newUser = { username, email, password, role: 'user'};
            await axios.post('http://localhost:5000/users', newUser);
            
            // Thực hiện đăng nhập tự động sau khi đăng ký
            authContext?.login('user', 'fake-jwt-token');
        alert('Đăng ký thành công!');
        navigate('/');
    } catch (error) {
        setErrorMessage('Đăng ký thất bại. Vui lòng thử lại.');
        console.error('Register error:', error);
    }
};

    return (
        <div className="auth-container">
            <div className="info-section">
                <h2>Bạn đã có tài khoản?</h2>
                <p>Chúng tôi cung cấp các loại trái cây tươi ngon nhất từ khắp nơi, đảm bảo chất lượng và dinh dưỡng tốt nhất.</p>
                <button onClick={() => navigate('/login')} className="toggle-button">ĐĂNG NHẬP</button>
            </div>
            
            <div className="form-section">
                <h2>Đăng Ký</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form className="auth-form" onSubmit={handleRegister}>
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
                    <button type="submit" className="auth-button">ĐĂNG KÝ</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
