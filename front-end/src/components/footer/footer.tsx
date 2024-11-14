// src/components/Footer.tsx
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';


const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h3>FruitShop</h3>
                    <p>FruitShop là nơi cung cấp các loại trái cây tươi ngon, chất lượng cao từ khắp nơi trên thế giới.</p>
                    <p>Chúng tôi cam kết mang lại sản phẩm an toàn và dịch vụ tốt nhất cho khách hàng.</p>
                </div>

                <div className="footer-section contact-info">
                    <h3>Liên Hệ</h3>
                    <p>Điện thoại: 0961378445</p>
                    <p>Email: thaopttpd09285@fpt.edu.vn</p>
                    <p>Địa chỉ: Hòa Khánh Nam, Liên Chiểu, Đà Nẵng</p>
                </div>

                <div className="footer-section social-media">
                    <h3>Theo Dõi Chúng Tôi</h3>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2024 FruitShop. All rights reserved.</p>
                <p><a href="/terms">Điều Khoản Sử Dụng</a> | <a href="/privacy">Chính Sách Bảo Mật</a></p>
            </div>
        </footer>
    );
};

export default Footer;
