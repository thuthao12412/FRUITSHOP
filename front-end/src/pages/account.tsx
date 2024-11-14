// src/pages/Account.tsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../stores/store';
import { fetchOrderHistory } from '../stores/slices/orderHistorySlice';

const Account: React.FC = () => {
    const authContext = useContext(AuthContext);
    const isLoggedIn = authContext?.isLoggedIn;
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    // Trạng thái chứa thông tin người dùng có thể chỉnh sửa
    const [userInfo, setUserInfo] = useState({
        username: "username",
        email: "user@example.com",
        phone: "0961378445",
        address: "123 Đường Trái Cây, Quận 1, TP. Hồ Chí Minh",
        joinedDate: "01/01/2024",
    });

    // Trạng thái cho đổi mật khẩu
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const orderHistory = useSelector((state: RootState) => state.orderHistory.orders);

    // Hàm bật/tắt chế độ chỉnh sửa
    const toggleEdit = () => setIsEditing(!isEditing);

    // Hàm bật/tắt chế độ đổi mật khẩu
    const toggleChangePassword = () => setIsChangingPassword(!isChangingPassword);

    // Hàm xử lý lưu thông tin mới
    const handleSave = () => {
        alert("Thông tin của bạn đã được cập nhật thành công!");
        setIsEditing(false);
    };

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchOrderHistory
                ());
        }
    }, [isLoggedIn, dispatch]);

    // Hàm xử lý đổi mật khẩu
    const handlePasswordChange = () => {
        if (oldPassword === "correctOldPassword") { // Giả sử mật khẩu cũ là "correctOldPassword"
            alert("Mật khẩu đã được thay đổi thành công!");
            setOldPassword('');
            setNewPassword('');
            setIsChangingPassword(false); // Đóng form đổi mật khẩu
        } else {
            alert("Mật khẩu cũ không đúng!");
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="account-container">
                <h2>Vui lòng đăng nhập để xem thông tin tài khoản</h2>
            </div>
        );
    }

    return (
        <div className="account-container">
            <h2>Thông Tin Tài Khoản</h2>

            <div className="account-content">
                {/* Cột bên trái: Thông tin tài khoản */}
                <div className="account-info">
                    {isEditing ? (
                        <>
                            <label>
                                Tên đăng nhập:
                                <input
                                    type="text"
                                    value={userInfo.username}
                                    onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    value={userInfo.email}
                                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                />
                            </label>
                            <label>
                                Điện thoại:
                                <input
                                    type="tel"
                                    value={userInfo.phone}
                                    onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                                />
                            </label>
                            <label>
                                Địa chỉ:
                                <input
                                    type="text"
                                    value={userInfo.address}
                                    onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                                />
                            </label>
                            <button onClick={handleSave} className="save-button">Lưu</button>
                            <button onClick={toggleEdit} className="cancel-button">Hủy</button>
                        </>
                    ) : (
                        <>
                            <p><strong>Tên đăng nhập:</strong> {userInfo.username}</p>
                            <p><strong>Email:</strong> {userInfo.email}</p>
                            <p><strong>Điện thoại:</strong> {userInfo.phone}</p>
                            <p><strong>Địa chỉ:</strong> {userInfo.address}</p>
                            <p><strong>Ngày tham gia:</strong> {userInfo.joinedDate}</p>
                            <button onClick={toggleEdit} className="update-button">Chỉnh sửa thông tin</button>
                        </>
                    )}

                    {isChangingPassword ? (
                        <div className="change-password">
                            <h3>Đổi Mật Khẩu</h3>
                            <label>
                                Mật khẩu cũ:
                                <input
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    placeholder="Nhập mật khẩu cũ"
                                />
                            </label>
                            <label>
                                Mật khẩu mới:
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Nhập mật khẩu mới"
                                />
                            </label>
                            <button onClick={handlePasswordChange} className="save-password-button">Lưu Mật Khẩu</button>
                            <button onClick={toggleChangePassword} className="cancel-button">Hủy</button>
                        </div>
                    ) : (
                        <button onClick={toggleChangePassword} className="change-password-button">Đổi mật khẩu</button>
                    )}
                </div>

                {/* Cột bên phải: Lịch sử đơn hàng */}
                <div className="order-history-container">
                    <h3>Lịch Sử Đơn Hàng</h3>
                    <table className="order-history">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Ngày đặt</th>
                                <th>Tổng</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderHistory.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.date}</td>
                                    <td>{order.total}</td>
                                    <td>{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Account;
