import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItem } from '../stores/slices/cartSlide';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  discountPrice?: number;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  const handleCardClick = () => {
    console.log('Product ID: ' + product.id);
    navigate(`/products/${product.id}`); // Sử dụng dấu `` thay vì '' cho template string
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn chặn việc kích hoạt handleCardClick khi nhấn vào nút
    dispatch(addItem({
      id: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    }));
  };

  return (
    <div className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">
        {product.discountPrice ? (
          <>
            <span className="original-price">{product.price} VND</span>
            <span className="discount-price">{product.discountPrice} VND</span>
          </>
        ) : (
          `${product.price} VND`
        )}
      </p>
      <button onClick={handleAddToCart} className="add-to-cart-button">
        Thêm vào Giỏ Hàng
      </button>
    </div>
  );
};

export default ProductCard;
