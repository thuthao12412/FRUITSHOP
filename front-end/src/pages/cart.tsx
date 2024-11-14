// src/pages/Cart.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
    selectCartItems, 
    selectTotalQuantity, 
    selectTotalPrice, 
    removeItem, 
    increaseQuantity, 
    decreaseQuantity 
} from '../stores/slices/cartSlide';

const Cart: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector(selectCartItems);
    const totalQuantity = useSelector(selectTotalQuantity);
    const totalPrice = useSelector(selectTotalPrice);

    const handleRemove = (id: number) => {
        dispatch(removeItem(id));
    };

    const handleIncrease = (id: number) => {
        dispatch(increaseQuantity(id));
    };

    const handleDecrease = (id: number) => {
        dispatch(decreaseQuantity(id));
    };

    return (
        <div className="cart-page">
            <h2>Giỏ Hàng</h2>
            <p>Tổng số lượng: {totalQuantity}</p>
            <p>Tổng giá: {totalPrice} VND</p>
            <div className="cart-items">
                {items.length > 0 ? (
                    items.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <p className="cart-item-name">{item.name}</p>
                                <p className="cart-item-price">Giá: {item.price} VND</p>
                                <div className="cart-item-quantity">
                                    <button onClick={() => handleDecrease(item.id)} className="quantity-button">-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleIncrease(item.id)} className="quantity-button">+</button>
                                </div>
                                <button onClick={() => handleRemove(item.id)} className="remove-item-button">
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Giỏ hàng của bạn đang trống.</p>
                )}
            </div>
            {items.length > 0 && (
                <button onClick={() => navigate('/checkout')} className="checkout-button">
                    Tiến hành Thanh Toán
                </button>
            )}
        </div>
    );
};

export default Cart;
