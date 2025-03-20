import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearCart, selectCartItems, selectTotalPrice } from '../stores/slices/cartSlide';
import { AuthContext } from '../context/authContext';

const Checkout: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const items = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);
    const [address, setAddress] = useState('');
    const [name, setName] = useState(''); // Thêm tên người nhận
    const [phone, setPhone] = useState(''); // Thêm số điện thoại
    const [paymentMethod, setPaymentMethod] = useState('credit');

    const handleConfirmOrder = async () => {
        if (!authContext?.userId) {
            alert('Vui lòng đăng nhập để đặt hàng.');
            return;
        }

        const order = {
            userId: authContext.userId,
            items,
            total: totalPrice,
            address,
            phone,  // Thêm số điện thoại vào đơn hàng
            name,   // Thêm tên người nhận vào đơn hàng
            paymentMethod,
            date: new Date().toLocaleDateString(),
            status: 'Đang xử lý',
        };

        try {
            await axios.post('http://localhost:5000/orders', order);
            dispatch(clearCart());
            alert('Đơn hàng của bạn đã được đặt thành công!');
            navigate('/account');
        } catch (error) {
            console.error('Lỗi khi đặt hàng:', error);
        }
    };

    return (
        <div className="checkout-page">
            <h2>Thanh Toán</h2>
            <div className="checkout-details">
                <div className="checkout-items">
                    {items.map((item) => (
                        <div key={item.id} className="checkout-item">
                            <img src={item.imageUrl} alt={item.name} className="product-image" /> {/* Hình ảnh sản phẩm */}
                            <div className="checkout-item-details">
                                <p>{item.name}</p>
                                <p>Giá: {item.price} VND</p>
                                <p>Số lượng: {item.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="checkout-form">
                    <h3>Thông Tin Giao Hàng</h3>
                    <input
                        type="text"
                        placeholder="Tên người nhận"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Số điện thoại"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Địa chỉ giao hàng"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <h3>Phương Thức Thanh Toán</h3>
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="credit">Thẻ tín dụng/Ghi nợ</option>
                        <option value="cash">Tiền mặt khi nhận hàng</option>
                    </select>
                    <h3 className="total-price">Tổng tiền: {totalPrice} VND</h3>
                    <button onClick={handleConfirmOrder}>Xác Nhận Đặt Hàng</button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
