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
    discountPrice?: number;
}

const ProductDetail: React.FC = () => {
    const dispatch = useDispatch();
    const { productId } = useParams<{ productId: string }>();
    const { id} = useParams<{ id: string }>();
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
        const fetchProduct = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/products/${id}`);
            setProduct(response.data);
          } catch (error) {
            console.error('Error fetching product details:', error);
          }
        };
        fetchProduct();
      }, [id]);

    if (!product) return <p>Loading...</p>;

    const handleAddToCart = () => {
        if (product) {
            dispatch(addItem({ ...product, quantity: 1 }));
        }
    };

    if (!product) return <p>Không tìm thấy sản phẩm.</p>;

    return (
        <div className="product-detail">
        <img src={product.imageUrl} alt={product.name} className="product-detail-image" />
        <h2>{product.name}</h2>
        <p className="product-detail-price">
          {product.discountPrice ? (
            <>
              <span className="original-price">{product.price} VND</span>
              <span className="discount-price">{product.discountPrice} VND</span>
            </>
          ) : (
            `${product.price} VND`
          )}
        </p>
        <p className="product-description">{product.description}</p>
      </div>
    );
};

export default ProductDetail;
