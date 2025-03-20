// src/pages/About.tsx
import React from 'react';

const About: React.FC = () => {
    return (
        <div className="about">
            <h2>Giới Thiệu Về Chúng Tôi</h2>
            <p>Chào mừng bạn đến với <strong>cửa hàng trái cây</strong> - nơi cung cấp các loại trái cây tươi ngon nhất từ khắp nơi.</p>

            <section className="about-section">
                <h3>Sứ Mệnh Của Chúng Tôi</h3>
                <p>
                    Cửa hàng trái cây cam kết đem đến cho khách hàng những loại trái cây tươi ngon, chất lượng cao và an toàn cho sức khỏe. Chúng tôi luôn chọn lựa kỹ càng từ các nhà cung cấp uy tín, đảm bảo mang lại giá trị dinh dưỡng tốt nhất cho mỗi sản phẩm.
                </p>
            </section>

            <section className="about-section">
                <h3>Tầm Nhìn</h3>
                <p>
                    Cửa hàng trái cây phấn đấu trở thành hệ thống cửa hàng trái cây hàng đầu, mang lại sản phẩm xanh - sạch - an toàn, giúp khách hàng có những trải nghiệm tuyệt vời trong mỗi bữa ăn gia đình. Chúng tôi mong muốn xây dựng một cộng đồng tiêu dùng thông minh và lành mạnh.
                </p>
            </section>

            <section className="about-section">
                <h3>Giá Trị Cốt Lõi</h3>
                <ul>
                    <li><strong>Chất Lượng:</strong> Đảm bảo chất lượng tốt nhất cho từng loại trái cây.</li>
                    <li><strong>Uy Tín:</strong> Luôn giữ chữ tín trong từng sản phẩm và dịch vụ.</li>
                    <li><strong>Sự Tận Tâm:</strong> Phục vụ khách hàng tận tâm, tư vấn nhiệt tình và hỗ trợ nhanh chóng.</li>
                    <li><strong>Đổi Mới:</strong> Không ngừng cải tiến và phát triển để đáp ứng nhu cầu của khách hàng.</li>
                </ul>
            </section>

            <section className="about-section">
                <h3>Tại Sao Chọn Chúng Tôi?</h3>
                <p>
                    Tại Fruit Shop, chúng tôi hiểu rằng khách hàng không chỉ muốn sản phẩm tốt mà còn cần một trải nghiệm mua sắm dễ dàng và an tâm. Vì vậy, chúng tôi luôn sẵn sàng lắng nghe và đáp ứng mọi nhu cầu của khách hàng.
                </p>
                <ul>
                    <li>Trái cây tươi ngon, nguồn gốc rõ ràng.</li>
                    <li>Cam kết an toàn và bảo vệ sức khỏe người tiêu dùng.</li>
                    <li>Giao hàng nhanh chóng và đóng gói cẩn thận.</li>
                    <li>Dịch vụ chăm sóc khách hàng thân thiện và chuyên nghiệp.</li>
                </ul>
            </section>

            <section className="about-section">
                <h3>Liên Hệ Với Chúng Tôi</h3>
                <p>
                    Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào, đừng ngần ngại liên hệ với chúng tôi. Đội ngũ Fruit Shop luôn sẵn sàng hỗ trợ bạn.
                </p>
                <p><strong>Email:</strong> support@fruitshop.com</p>
                <p><strong>Hotline:</strong> 1800-1234</p>
                <p><strong>Địa chỉ:</strong> 123 Đường Trái Cây, Quận Trái Cây, TP. Trái cây</p>
            </section>
        </div>
    );
};

export default About;
