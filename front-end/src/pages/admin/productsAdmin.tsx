import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
    imageUrl: string;
}

const ProductsAdmin: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [productsPerPage] = useState(5); // Số sản phẩm mỗi trang
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: 0,
        category: '',
        description: '',
        imageUrl: '',
    });
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (authContext?.role !== 'admin') {
            navigate('/login');
        }
    }, [authContext?.role, navigate]);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:5000/products');
            setProducts(response.data);
        } catch (err) {
            setError('Lỗi khi tải sản phẩm.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Lấy sản phẩm của trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleAddProduct = async () => {
        try {
            const response = await axios.post('http://localhost:5000/products', newProduct);
            setProducts([...products, response.data]);
            setNewProduct({ name: '', price: 0, category: '', description: '', imageUrl: '' });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleUpdateProduct = async () => {
        if (editingProduct) {
            try {
                await axios.put(`http://localhost:5000/products/${editingProduct.id}`, editingProduct);
                fetchProducts();
                setEditingProduct(null);
            } catch (error) {
                console.error('Error updating product:', error);
            }
        }
    };

    const handleDeleteProduct = async (id: number) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/products/${id}`);
                setProducts(products.filter((product) => product.id !== id));
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    return (
        <div className="admin-container">
            <h1>Quản Lý Sản Phẩm</h1>
            {loading && <p className="loading">Đang tải...</p>}
            {error && <p className="error">{error}</p>}

            <div className="admin-grid">
            <div className="add-product-section">
    <h2>Thêm Sản Phẩm</h2>
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
    <input
        type="text"
        placeholder="URL Hình Ảnh"
        value={newProduct.imageUrl}
        onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
    />
    <button onClick={handleAddProduct}>Thêm Sản Phẩm</button>
</div>


                <div className="product-list-section">
                    <h2>Danh Sách Sản Phẩm</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Hình Ảnh</th>
                                <th>Tên</th>
                                <th>Giá</th>
                                <th>Danh mục</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button onClick={() => setEditingProduct(product)}>Sửa</button>
                                            <button onClick={() => handleDeleteProduct(product.id)}>Xóa</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Phân trang */}
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {editingProduct && (
                <div className="edit-product-section">
                    <h2>Chỉnh Sửa Sản Phẩm</h2>
                    <input
                        type="text"
                        placeholder="Tên sản phẩm"
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Giá"
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: parseInt(e.target.value) })}
                    />
                    <input
                        type="text"
                        placeholder="Danh mục"
                        value={editingProduct.category}
                        onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    />
                    <textarea
                        placeholder="Mô tả sản phẩm"
                        value={editingProduct.description}
                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="URL Hình Ảnh"
                        value={editingProduct.imageUrl}
                        onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                    />
                    <button onClick={handleUpdateProduct}>Lưu Thay Đổi</button>
                    <button onClick={() => setEditingProduct(null)}>Hủy</button>
                </div>
            )}
        </div>
    );
};

export default ProductsAdmin;
