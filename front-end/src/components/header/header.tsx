import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUserPlus, FaSignInAlt, FaSignOutAlt, FaUserShield, FaUsers, FaChartBar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectTotalQuantity } from '../../stores/slices/cartSlide'; // Import selector từ cartSlice
import { AuthContext } from '../../context/authContext'; // Import AuthContext

const Header: React.FC = () => {
    const authContext = useContext(AuthContext);
    const isLoggedIn = authContext?.isLoggedIn;
    const userRole = authContext?.role;
    const navigate = useNavigate();

    // Lấy tổng số lượng sản phẩm trong giỏ hàng từ Redux
    const totalQuantity = useSelector(selectTotalQuantity);

    const handleLogout = () => {
        authContext?.logout();
        alert('Bạn đã đăng xuất!');
        navigate('/');
    };

    return (
        <header className="header">
            <div className="header__logo">
                <h1>Cửa hàng trái cây</h1>
            </div>
            <nav className="header__nav">
                {userRole === 'admin' ? (
                    <>
                        {/* Hiển thị giao diện admin */}
                        <Link to="/admin/dashboard" className="header__icon-link">
                            <FaChartBar className="header__icon" /> Thống kê
                        </Link>
                        <Link to="/admin/productsadmin" className="header__icon-link">
                            <FaUserShield className="header__icon" /> Quản Lý Sản Phẩm
                        </Link>
                        <Link to="/admin/users" className="header__icon-link">
                            <FaUsers className="header__icon" /> Quản Lý Người Dùng
                        </Link>
                        <Link to="/admin/orders" className="header__icon-link">
                            <FaChartBar className="header__icon" /> Quản Lý Đơn Hàng
                        </Link>
                        <button onClick={handleLogout} className="header__icon-link logout-button">
                            <FaSignOutAlt className="header__icon" /> Đăng Xuất
                        </button>
                    </>
                ) : (
                    <>
                        {/* Hiển thị giao diện user */}
                        <Link to="/">Trang Chủ</Link>
                        <Link to="/about">Giới Thiệu</Link>
                        <Link to="/contact">Liên Hệ</Link>
                        <Link to="/products">Sản phẩm</Link>
                        <Link to="/cart" className="header__icon-link">
                            <FaShoppingCart className="header__icon" />
                            {totalQuantity > 0 && (
                                <span className="cart-count">{totalQuantity}</span>
                            )}
                            Giỏ Hàng
                        </Link>
                        {isLoggedIn ? (
                            <>
                                <Link to="/account" className="header__icon-link">
                                    <FaUserPlus className="header__icon" /> Tài Khoản
                                </Link>
                                <button onClick={handleLogout} className="header__icon-link logout-button">
                                    <FaSignOutAlt className="header__icon" /> Đăng Xuất
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/register" className="header__icon-link">
                                    <FaUserPlus className="header__icon" /> Đăng Ký
                                </Link>
                                <Link to="/login" className="header__icon-link">
                                    <FaSignInAlt className="header__icon" /> Đăng Nhập
                                </Link>
                            </>
                        )}
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
