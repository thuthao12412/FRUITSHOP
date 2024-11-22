import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../stores/store';
import { fetchOrderHistory } from '../stores/slices/orderHistorySlice';

const Account: React.FC = () => {
    const authContext = useContext(AuthContext);
    const isLoggedIn = authContext?.isLoggedIn;
    const userId = authContext?.userId; // Moved outside the condition
    const dispatch = useDispatch<AppDispatch>();

    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        phone: '',
        address: '',
        joinedDate: '',
    });
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const orderHistory = useSelector((state: RootState) => state.orderHistory.orders);

    useEffect(() => {
        if (isLoggedIn && userId) {
            dispatch(fetchOrderHistory(userId)); // Only fetch if `userId` exists
        }
    }, [isLoggedIn, authContext?.userId, dispatch]);

    const handleSave = () => {
        alert('Thông tin của bạn đã được cập nhật thành công!');
        setIsEditing(false);
    };

    const handlePasswordChange = () => {
        if (oldPassword === 'correctOldPassword') {
            alert('Mật khẩu đã được thay đổi thành công!');
            setOldPassword('');
            setNewPassword('');
            setIsChangingPassword(false);
        } else {
            alert('Mật khẩu cũ không đúng!');
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
                            <button onClick={handleSave}>Lưu</button>
                            <button onClick={() => setIsEditing(false)}>Hủy</button>
                        </>
                    ) : (
                        <>
                            <p><strong>Tên đăng nhập:</strong> {authContext?.username}</p>
                            <p><strong>Email:</strong> {authContext?.email}</p>
                            <p><strong>Điện thoại:</strong> {authContext?.phone}</p>
                            <p><strong>Địa chỉ:</strong> {authContext?.address}</p>
                            <p><strong>Ngày tham gia:</strong> {userInfo.joinedDate}</p>
                            <button onClick={() => setIsEditing(true)}>Chỉnh sửa thông tin</button>
                        </>
                    )}
                    {isChangingPassword ? (
                        <>
                            <label>
                                Mật khẩu cũ:
                                <input
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </label>
                            <label>
                                Mật khẩu mới:
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </label>
                            <button onClick={handlePasswordChange}>Lưu Mật Khẩu</button>
                            <button onClick={() => setIsChangingPassword(false)}>Hủy</button>
                        </>
                    ) : (
                        <button onClick={() => setIsChangingPassword(true)}>Đổi mật khẩu</button>
                    )}
                </div>
                <div className="order-history-container">
                    <h3>Lịch Sử Đơn Hàng</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Ngày đặt</th>
                                <th>Tổng</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderHistory.map((order) => (
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
