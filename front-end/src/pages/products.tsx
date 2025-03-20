import React, { useEffect, useState } from 'react';
import ProductCard from '../components/productCard'; // Nhập ProductCard
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  discountPrice?: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>(''); // Thứ tự sắp xếp
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8; // Số lượng sản phẩm hiển thị mỗi trang

  // Lấy danh sách sản phẩm từ API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
      setFilteredProducts(response.data); // Hiển thị tất cả sản phẩm ban đầu
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Lỗi khi lấy sản phẩm. Vui lòng thử lại.');
    }
  };

  useEffect(() => {
    fetchProducts(); // Gọi hàm fetch sản phẩm khi component load
  }, []);

  // Tìm kiếm sản phẩm
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1); // Reset về trang đầu tiên sau khi tìm kiếm
  };

  // Sắp xếp sản phẩm theo giá
  const handleSort = (order: 'asc' | 'desc') => {
    setSortOrder(order);
    const sortedProducts = [...filteredProducts].sort((a, b) =>
      order === 'asc' ? a.price - b.price : b.price - a.price
    );
    setFilteredProducts(sortedProducts);
    setCurrentPage(1); // Reset về trang đầu tiên sau khi sắp xếp
  };

  // Chọn sản phẩm hiện tại theo trang
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="products-page">
      <h2>Danh Sách Sản Phẩm</h2>

      {/* Thanh tìm kiếm */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Tìm kiếm</button>
      </form>

      {/* Bộ lọc sắp xếp */}
      <div className="sort-options">
        <button
          className={`sort-button ${sortOrder === 'asc' ? 'active' : ''}`}
          onClick={() => handleSort('asc')}
        >
          Giá tăng dần
        </button>
        <button
          className={`sort-button ${sortOrder === 'desc' ? 'active' : ''}`}
          onClick={() => handleSort('desc')}
        >
          Giá giảm dần
        </button>
      </div>

      {/* Lưới sản phẩm */}
      <div className="products-grid">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Không tìm thấy sản phẩm nào.</p>
        )}
      </div>

      {/* Phân trang */}
      {totalPages > 1 && (
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
      )}
    </div>
  );
};

export default Products;
