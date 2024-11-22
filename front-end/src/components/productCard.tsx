import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../stores/slices/cartSlide';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  discountPrice?: number;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  // Điều hướng đến chi tiết sản phẩm
  const handleDetailsClick = () => {
    navigate(`/product/${product.id}`);
  };

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = () => {
    if (!authContext?.isLoggedIn) {
      alert('Vui lồng đăng nhập để thêm sản phẩm vào giỏ hàng!');
      navigate('/login');
      return;
    }
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.discountPrice || product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
      })
    );
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  return (
    <div className="product-card">
      <img
        src={product.imageUrl || 'https://via.placeholder.com/150'}
        alt={product.name}
        className="product-image"
      />
      <h3 className="product-name">{product.name}</h3>
      <div className="product-price">
        {product.discountPrice ? (
          <>
            <span className="original-price">{product.price.toLocaleString()} VND</span>
            <span className="discount-price">{product.discountPrice.toLocaleString()} VND</span>
          </>
        ) : (
          <span className="discount-price">{product.price.toLocaleString()} VND</span>
        )}
      </div>
      <div className="product-actions">
        <button onClick={handleDetailsClick} className="detail-button">
          Chi tiết
        </button>
        <button onClick={handleAddToCart} className="add-to-cart-button">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
