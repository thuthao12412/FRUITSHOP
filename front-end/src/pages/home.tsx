import React, { useEffect, useState } from 'react';
import ProductCard from '../components/productCard';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  discountPrice?: number;
  isBestSeller: boolean;
  isOnSale: boolean;
}

const Home: React.FC = () => {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [onSaleProducts, setOnSaleProducts] = useState<Product[]>([]);
  const [currentBestSellerPage, setCurrentBestSellerPage] = useState(1);
  const [currentOnSalePage, setCurrentOnSalePage] = useState(1);
  const itemsPerPage = 10;

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const responseBestSellers = await axios.get('http://localhost:5000/products?isBestSeller=true');
      const responseOnSale = await axios.get('http://localhost:5000/products?isOnSale=true');
      setBestSellers(responseBestSellers.data);
      setOnSaleProducts(responseOnSale.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Paginate products
  const paginatedBestSellers = bestSellers.slice(
    (currentBestSellerPage - 1) * itemsPerPage,
    currentBestSellerPage * itemsPerPage
  );
  const paginatedOnSaleProducts = onSaleProducts.slice(
    (currentOnSalePage - 1) * itemsPerPage,
    currentOnSalePage * itemsPerPage
  );

  const handleBestSellerPageChange = (page: number) => {
    setCurrentBestSellerPage(page);
  };

  const handleOnSalePageChange = (page: number) => {
    setCurrentOnSalePage(page);
  };

  // Kiểm tra xem có cần hiển thị phân trang hay không
  const shouldShowPaginationBestSellers = Math.ceil(bestSellers.length / itemsPerPage) > 1;
  const shouldShowPaginationOnSale = Math.ceil(onSaleProducts.length / itemsPerPage) > 1;

  return (
    <div className="home-page">
      {/* Banner */}
      <section className="banner">
        <h1>Welcome to Our Store</h1>
        <p>Discover the best products at unbeatable prices.</p>
        <a href="#shop-now" className="banner-btn">Shop Now</a>
      </section>

      {/* Best Sellers */}
      <section className="best-sellers">
        <h2>Sản Phẩm Bán Chạy</h2>
        <div className="products-grid">
          {paginatedBestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {/* Pagination for Best Sellers */}
        <div className={`pagination ${shouldShowPaginationBestSellers ? 'visible' : ''}`}>
          {Array.from({ length: Math.ceil(bestSellers.length / itemsPerPage) }, (_, index) => (
            <button
              key={index}
              className={`pagination-button ${index + 1 === currentBestSellerPage ? 'active' : ''}`}
              onClick={() => handleBestSellerPageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>

      {/* On Sale Products */}
      <section className="on-sale">
        <h2>Sản Phẩm Giảm Giá</h2>
        <div className="products-grid">
          {paginatedOnSaleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {/* Pagination for On Sale Products */}
        <div className={`pagination ${shouldShowPaginationOnSale ? 'visible' : ''}`}>
          {Array.from({ length: Math.ceil(onSaleProducts.length / itemsPerPage) }, (_, index) => (
            <button
              key={index}
              className={`pagination-button ${index + 1 === currentOnSalePage ? 'active' : ''}`}
              onClick={() => handleOnSalePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>Về Chúng Tôi</h2>
        <div className="about-container">
          <div className="about-item">
            <img src="icon1.png" alt="Icon 1" />
            <p>Chúng tôi cung cấp những sản phẩm trái cây tươi ngon nhất.</p>
          </div>
          <div className="about-item">
            <img src="icon2.png" alt="Icon 2" />
            <p>Luôn ưu tiên chất lượng và sức khỏe của khách hàng.</p>
          </div>
          <div className="about-item">
            <img src="icon3.png" alt="Icon 3" />
            <p>Cam kết bảo vệ môi trường và phát triển bền vững.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
