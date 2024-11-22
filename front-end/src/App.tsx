// src/App.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import Products from './pages/products';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import { selectCartItems } from './stores/slices/cartSlide';
import Login from './pages/login';
import Register from './pages/register';
import './App.css';
import Contact from './pages/contact';
import Footer from './components/footer/footer';
import ProductDetail from './pages/productDetail';
import Header from './components/header/header';
import About from './pages/about';
import AuthPage from './pages/authPage';
import { AuthProvider } from './context/authContext';
import Account from './pages/account';
import Dashboard from './pages/admin/dashboard';
import UsersAdmin from './pages/admin/usersAdmin';
import ProductsAdmin from './pages/admin/productsAdmin';
import OrdersAdmin from './pages/admin/ordersAdmin';

const App: React.FC = () => {
    // Sử dụng useSelector để lấy các sản phẩm trong giỏ
    const cartItems = useSelector(selectCartItems);
    
    // Tính tổng số lượng sản phẩm
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <AuthProvider>
        <Router>
           <Header />

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} /> {/* Đường dẫn đến chi tiết sản phẩm */}
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/admin/dashboard" element={<Dashboard />} />
<Route path="/admin/orders" element={<OrdersAdmin />} />
                <Route path="/admin/productsadmin" element={<ProductsAdmin />} />
                <Route path="/admin/users" element={<UsersAdmin />} />
                </Routes>
            </main>
            <Footer />
        </Router>
        </AuthProvider>
    );
};

export default App;
