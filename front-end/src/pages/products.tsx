// src/pages/Products.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { addItem } from '../stores/slices/cartSlide';

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

const Products: React.FC = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const itemsPerPage = 8; // 4 products per row, 2 rows

    const fetchProducts = async (page: number) => {
        try {
            const response = await axios.get(`http://localhost:5000/products?_page=${page}&_limit=${itemsPerPage}`);
            setProducts(response.data);
            setTotalPages(Math.ceil(response.headers['x-total-count'] / itemsPerPage));
            setCurrentPage(page);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const handleAddToCart = (product: Product) => {
        dispatch(addItem({ ...product, quantity: 1 }));
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="products-page">
            <h2>Danh sách trái cây</h2>
            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <Link to={`/product/${product.id}`} className="product-link">
                            <img src={product.imageUrl} alt={product.name} className="product-image" />
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">Giá: {product.price} VND</p>
                        </Link>
                        <button onClick={() => handleAddToCart(product)} className="add-to-cart-button">
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`pagination-button ${index + 1 === currentPage ? 'active' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Products;
