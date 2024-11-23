import React, { useState, useContext } from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrorMessage(null);

        try {
            const newUser = { username, email, password, phone, address, role: 'user' };
            const response = await axios.post('http://localhost:5000/users', newUser);

            // Simulate login after successful registration
            const userId = response.data.id;
            authContext?.login(
                'user',
                'fake-jwt-token',
                userId,
                email,
                username,
                phone,
                address,
                3600 // 1-hour expiry
            );

            alert('Đăng ký thành công!');
            navigate('/');
        } catch (error) {
            console.error('Register error:', error);
            setErrorMessage('Đăng ký thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <div className="auth-container">
            <div className="info-section">
                <h2>Bạn đã có tài khoản?</h2>
                <p>
                    Chúng tôi cung cấp các loại trái cây tươi ngon nhất từ khắp nơi, đảm bảo chất lượng và dinh dưỡng tốt nhất
                    cho bạn và gia đình.
                </p>
                <button onClick={() => navigate('/login')} className="toggle-button">
                    ĐĂNG NHẬP
                </button>
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
                            autoComplete="new-password"
                        />
                    </div>
                    <div className="input-group">
                        <FaPhone className="input-icon" />
                        <input
                            type="text"
                            placeholder="Số điện thoại"
                            required
                            className="input-field"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <FaMapMarkerAlt className="input-icon" />
                        <input
                            type="text"
                            placeholder="Địa chỉ"
                            required
                            className="input-field"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="auth-button">
                        ĐĂNG KÝ
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
