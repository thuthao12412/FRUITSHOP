// src/components/Header.tsx
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUserPlus, FaSignInAlt, FaSignOutAlt, FaSearch, FaUserShield, FaUsers, FaChartBar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectTotalQuantity } from '../../stores/slices/cartSlide'; // Import selector từ cartSlice
import { AuthContext } from '../../context/authContext'; // Import AuthContext

const Header: React.FC = () => {
    const authContext = useContext(AuthContext);
    const isLoggedIn = authContext?.isLoggedIn;
    const userRole = authContext?.role;
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // Lấy tổng số lượng sản phẩm trong giỏ hàng từ Redux
    const totalQuantity = useSelector(selectTotalQuantity);

    const handleLogout = () => {
        authContext?.logout();
        alert('Bạn đã đăng xuất!');
        navigate('/');
    };

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${searchQuery}`);
        }
    };

    return (
        <header className="header">
            <div className="header__logo">
                <h1>Fruit Shop</h1>
            </div>
            <nav className="header__nav">
                {userRole === 'admin' ? (
                    <>
                        {/* Hiển thị giao diện admin */}
                        <Link to="/admin/dashboard" className="header__icon-link">
                            <FaChartBar className="header__icon" /> Dashboard
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
            <div className="header__search">
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">
                        <FaSearch />
                    </button>
                </form>
            </div>
        </header>
    );
};

export default Header;
