import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../stores/store';
import { setCartData, increaseQuantity, decreaseQuantity, removeItem } from '../stores/slices/cartSlide';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

const Cart: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true); // Trạng thái đang tải dữ liệu
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchUserCart = async () => {
      const userId = authContext?.userId;
      if (userId) {
        try {
          setIsLoading(true);
          const response = await axios.get(`http://localhost:5000/carts?userId=${userId}`);
          if (response.data) {
            dispatch(
              setCartData({
                items: response.data.items || [],
                totalQuantity: response.data.totalQuantity || 0,
                totalPrice: response.data.totalPrice || 0,
                userId: userId,
              })
            );
          }
        } catch (error) {
          console.error('Lỗi khi tải dữ liệu giỏ hàng:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (authContext?.isLoggedIn) {
      fetchUserCart();
    } else {
      setIsLoading(false);
    }
  }, [authContext?.isLoggedIn, authContext?.userId, dispatch]);

  // Xử lý tăng số lượng sản phẩm
  const handleIncrease = (id: number) => {
    dispatch(increaseQuantity(id));
  };

  // Xử lý giảm số lượng sản phẩm
  const handleDecrease = (id: number) => {
    dispatch(decreaseQuantity(id));
  };

  // Xử lý xóa sản phẩm khỏi giỏ hàng
  const handleRemove = (id: number) => {
    dispatch(removeItem(id));
  };

  // Xử lý thanh toán
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Giỏ hàng của bạn đang trống!');
    } else {
      navigate('/checkout');
    }
  };

  if (!authContext?.isLoggedIn) {
    return (
      <div>
        <p>Vui lòng đăng nhập để xem giỏ hàng.</p>
        <button onClick={() => navigate('/login')}>Đăng nhập</button>
      </div>
    );
  }

  if (isLoading) {
    return <p>Đang tải dữ liệu giỏ hàng...</p>;
  }

  return (
    <div className="cart-container">
      <h2>Giỏ Hàng</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Không có sản phẩm trong giỏ hàng</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl || 'https://via.placeholder.com/80'} alt={item.name} />
              <div className="cart-item-details">
                <p>
                  <strong>{item.name}</strong>
                </p>
                <p>Giá: {item.price.toLocaleString()} VND</p>
                <p>Số lượng: {item.quantity}</p>
              </div>
              <div className="cart-actions">
                <button onClick={() => handleDecrease(item.id)}>-</button>
                <button onClick={() => handleIncrease(item.id)}>+</button>
                <button className="remove-button" onClick={() => handleRemove(item.id)}>
                  Xóa
                </button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <strong>Tổng tiền: {totalPrice.toLocaleString()} VND</strong>
          </div>
          <button className="checkout-button" onClick={handleCheckout}>
            Thanh Toán
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
