import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
}

const ProductsAdmin: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: 0, category: '', description: '' });

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/products'); // Adjusted endpoint
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddProduct = async () => {
        try {
            const response = await axios.post('http://localhost:5000/products', newProduct); // Adjusted endpoint
            setProducts([...products, response.data]);
            setNewProduct({ name: '', price: 0, category: '', description: '' });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleEditProduct = async (id: number) => {
        const updatedProduct = products.find((product) => product.id === id);
        if (updatedProduct) {
            try {
                await axios.put(`http://localhost:5000/products/${id}`, updatedProduct); // Adjusted endpoint
                fetchProducts();
            } catch (error) {
                console.error('Error updating product:', error);
            }
        }
    };

    const handleDeleteProduct = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5000/products/${id}`); // Adjusted endpoint
            setProducts(products.filter((product) => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="admin-container">
            <h1>Quản Lý Sản Phẩm</h1>
            <input
                type="text"
                placeholder="Tên sản phẩm"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
                type="number"
                placeholder="Giá"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: parseInt(e.target.value) })}
            />
            <input
                type="text"
                placeholder="Danh mục"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
            <textarea
                placeholder="Mô tả sản phẩm"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <button onClick={handleAddProduct}>Thêm Sản Phẩm</button>
            <table>
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Giá</th>
                        <th>Danh mục</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>
                                <button onClick={() => handleEditProduct(product.id)}>Sửa</button>
                                <button onClick={() => handleDeleteProduct(product.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsAdmin;
