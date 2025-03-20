import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../stores/store';
import { fetchOrderHistory } from '../stores/slices/orderHistorySlice';
import axios from 'axios';
import { toast } from 'react-toastify'; // Thêm thư viện thông báo

const Account: React.FC = () => {
    const authContext = useContext(AuthContext);
    const isLoggedIn = authContext?.isLoggedIn;
    const userId = authContext?.userId;
    const dispatch = useDispatch<AppDispatch>();

    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [userInfo, setUserInfo] = useState({
        username: authContext?.username || '',
        email: authContext?.email || '',
        phone: authContext?.phone || '',
        address: authContext?.address || '',
    });
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const orderHistory = useSelector((state: RootState) => state.orderHistory.orders);

    useEffect(() => {
        if (isLoggedIn && userId) {
            dispatch(fetchOrderHistory(userId));
        }
    }, [isLoggedIn, userId, dispatch]);

    // Đổi mật khẩu
    const handlePasswordChange = async () => {
        try {
            const response = await axios.patch(`http://localhost:5000/users/${userId}`, {
                oldPassword,
                newPassword,
            });
            toast.success(response.data.message || 'Mật khẩu đã được thay đổi thành công!');
            setOldPassword('');
            setNewPassword('');
            setIsChangingPassword(false);
        } catch (error) {
            console.error('Lỗi khi đổi mật khẩu:', error);
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || 'Đã xảy ra lỗi khi đổi mật khẩu.');
            }
        }
    };

    // Lưu thông tin người dùng
    const handleSave = async () => {
        try {
            const response = await axios.patch(`http://localhost:5000/users/${userId}`, userInfo);
            toast.success('Thông tin của bạn đã được cập nhật thành công!');
            setIsEditing(false);
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin người dùng:', error);
            toast.error('Đã xảy ra lỗi khi cập nhật thông tin.');
        }
    };

    // Phân trang
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedOrders = orderHistory.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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
                                    onChange={(e) =>
                                        setUserInfo({ ...userInfo, username: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    value={userInfo.email}
                                    onChange={(e) =>
                                        setUserInfo({ ...userInfo, email: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Điện thoại:
                                <input
                                    type="tel"
                                    value={userInfo.phone}
                                    onChange={(e) =>
                                        setUserInfo({ ...userInfo, phone: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Địa chỉ:
                                <input
                                    type="text"
                                    value={userInfo.address}
                                    onChange={(e) =>
                                        setUserInfo({ ...userInfo, address: e.target.value })
                                    }
                                />
                            </label>
                            <button onClick={handleSave}>Lưu</button>
                            <button onClick={() => setIsEditing(false)}>Hủy</button>
                        </>
                    ) : (
                        <>
                            <p>
                                <strong>Tên đăng nhập:</strong> {authContext?.username}
                            </p>
                            <p>
                                <strong>Email:</strong> {authContext?.email}
                            </p>
                            <p>
                                <strong>Điện thoại:</strong> {authContext?.phone}
                            </p>
                            <p>
                                <strong>Địa chỉ:</strong> {authContext?.address}
                            </p>
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
                            {paginatedOrders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.date}</td>
                                    <td>{order.total.toLocaleString()} VND</td>
                                    <td>{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        {Array.from(
                            { length: Math.ceil(orderHistory.length / itemsPerPage) },
                            (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`pagination-button ${
                                        currentPage === index + 1 ? 'active' : ''
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
