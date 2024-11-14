// src/pages/Contact.tsx
import React from 'react';


const Contact: React.FC = () => {
    return (
        <div className="contact-page">
            <h1>Liên Hệ Với Chúng Tôi</h1>
            <p className="contact-intro">Chúng tôi luôn sẵn sàng lắng nghe ý kiến đóng góp của bạn và hỗ trợ mọi yêu cầu mua sắm!</p>
            
            <section className="contact-info">
                <div className="contact-detail">
                    <h3>Địa Chỉ</h3>
                    <p>Hòa Khánh Nam, Liên Chiểu, Đà Nẵng</p>
                </div>
                <div className="contact-detail">
                    <h3>Email</h3>
                    <p>thaopttpd09285@fpt.edu.vn</p>
                </div>
                <div className="contact-detail">
                    <h3>Điện Thoại</h3>
                    <p>0961378445</p>
                </div>
            </section>

            <section className="contact-form">
                <h2>Gửi Tin Nhắn Cho Chúng Tôi</h2>
                <form>
                    <input type="text" name="name" placeholder="Tên của bạn" required />
                    <input type="email" name="email" placeholder="Email của bạn" required />
                    <textarea name="message" rows={5} placeholder="Nội dung tin nhắn" required></textarea>
                    <button type="submit" className="submit-button">Gửi Tin Nhắn</button>
                </form>
            </section>
        </div>
    );
};

export default Contact;
