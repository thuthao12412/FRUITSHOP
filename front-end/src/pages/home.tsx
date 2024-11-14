import React, { useEffect, useState, useRef } from 'react';
import ProductCard from '../components/productCard';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  discountPrice?: number;
}

const Home: React.FC = () => {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [onSaleProducts, setOnSaleProducts] = useState<Product[]>([]);
  const bestSellersRef = useRef<HTMLDivElement>(null);
  const onSaleProductsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBestSellers = async () => {
      const response = await axios.get('http://localhost:5000/products?isBestSeller=true');
      setBestSellers(response.data);
    };

    const fetchOnSaleProducts = async () => {
      const response = await axios.get('http://localhost:5000/products?isOnSale=true');
      setOnSaleProducts(response.data);
    };

    fetchBestSellers();
    fetchOnSaleProducts();
  }, []);

  const scrollLeft = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollBy({ left: -220, behavior: 'smooth' });
  };

  const scrollRight = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollBy({ left: 220, behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      <section className="banner">
        <img src="https://via.placeholder.com/1200x400" alt="Banner" />
      </section>
      <section className="best-sellers">
        <h2>Sản phẩm bán chạy</h2>
        <div className="scroll-buttons">
          <button className="scroll-button" onClick={() => scrollLeft(bestSellersRef)}>&#9664;</button>
          <div className="product-list" ref={bestSellersRef}>
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <button className="scroll-button" onClick={() => scrollRight(bestSellersRef)}>&#9654;</button>
        </div>
      </section>
      <section className="on-sale">
        <h2>Sản phẩm đang giảm giá</h2>
        <div className="scroll-buttons">
          <button className="scroll-button" onClick={() => scrollLeft(onSaleProductsRef)}>&#9664;</button>
          <div className="product-list" ref={onSaleProductsRef}>
            {onSaleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <button className="scroll-button" onClick={() => scrollRight(onSaleProductsRef)}>&#9654;</button>
        </div>
      </section>
      <section className="about-section">
        <h2>VỀ CHÚNG TÔI</h2>
        <div className="about-container">
          <div className="about-item">
            <img src="icon1.png" alt="Pioneer Service Icon" className="about-icon" />
            <p>Chúng tôi tự hào là thương hiệu tiên phong trong dịch vụ cung cấp sản phẩm và giải pháp trái cây tươi an toàn đến nhiều công ty và văn phòng.</p>
          </div>
          <div className="about-item">
            <img src="icon2.png" alt="Natural Product Icon" className="about-icon" />
            <p>Ủng hộ nông sản Việt chất lượng, an toàn, canh tác bền vững, không hóa chất độc hại bảo vệ môi sinh là tiêu chí của chúng tôi.</p>
          </div>
          <div className="about-item">
            <img src="icon3.png" alt="Customer Satisfaction Icon" className="about-icon" />
            <p>Tự tin, sáng tạo, hoạt động bền vững, luôn lắng nghe và sẵn sàng đem đến những trải nghiệm tốt nhất cho khách hàng.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
