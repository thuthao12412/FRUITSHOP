import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { addItem } from '../stores/slices/cartSlide';

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
}

const ProductDetail: React.FC = () => {
    const dispatch = useDispatch();
    const { productId } = useParams<{ productId: string }>();
    
    const [product, setProduct] = useState<Product | null>(null);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/products/${productId}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy thông tin sản phẩm:', error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    if (!product) return <p>Loading...</p>;

    const handleAddToCart = () => {
        if (product) {
            dispatch(addItem({ ...product, quantity: 1 }));
        }
    };

    if (!product) return <p>Không tìm thấy sản phẩm.</p>;

    return (
        <div className="product-detail">
            <h2>{product.name}</h2>
            <img src={product.imageUrl} alt={product.name} className="product-detail-image" />
            <p className="product-detail-price">Giá: {product.price} VND</p>
            <p className="product-detail-description">{product.description}</p>
            <button onClick={handleAddToCart} className="add-to-cart-button">
                Thêm vào giỏ hàng
            </button>
        </div>
    );
};

export default ProductDetail;
