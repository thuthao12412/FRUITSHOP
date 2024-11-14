import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { selectCartItems, selectTotalPrice, clearCart } from '../stores/slices/cartSlide';

const Checkout: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('credit');

    const handleConfirmOrder = async () => {
        const order = {
            items,
            total: totalPrice,
            address,
            paymentMethod,
            date: new Date().toLocaleDateString(),
            status: 'Đang xử lý'
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
                            <p>{item.name}</p>
                            <p>Giá: {item.price} VND</p>
                            <p>Số lượng: {item.quantity}</p>
                        </div>
                    ))}
                </div>
                <div className="checkout-form">
                    <h3>Thông Tin Giao Hàng</h3>
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
