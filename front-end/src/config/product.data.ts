import React from 'react'

export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
    image?: string; // Thêm thuộc tính ảnh để hiển thị hình ảnh sản phẩm
    inStock?: boolean; // Thêm thuộc tính hiển thị tình trạng kho hàng
}

const products: Product[] = [
    { 
        id: 1, 
        name: "Táo Mỹ", 
        category: "Trái Cây Nhập Khẩu", 
        price: 50000, 
        description: "Táo Mỹ giòn và ngọt, thích hợp cho bữa ăn nhẹ.",
        image: "/images/tao-my.jpg", // Đường dẫn ảnh mẫu
        inStock: true
    },
    { 
        id: 2, 
        name: "Cam Việt Nam", 
        category: "Trái Cây Trong Nước", 
        price: 30000, 
        description: "Cam tươi ngon, cung cấp vitamin C và dinh dưỡng thiết yếu.",
        image: "/images/cam-vn.jpg",
        inStock: true
    },
    { 
        id: 3, 
        name: "Chuối Nhật", 
        category: "Sản Phẩm Khác", 
        price: 40000, 
        description: "Chuối ngọt và mềm, là nguồn năng lượng dồi dào cho cơ thể.",
        image: "/images/chuoi-nhat.jpg",
        inStock: false
    },
    { 
        id: 4, 
        name: "Dưa Hấu Việt Nam", 
        category: "Trái Cây Trong Nước", 
        price: 25000, 
        description: "Dưa hấu mọng nước, thích hợp để giải nhiệt vào mùa hè.",
        image: "/images/dua-hau.jpg",
        inStock: true
    },
    { 
        id: 5, 
        name: "Nho Đen Úc", 
        category: "Trái Cây Nhập Khẩu", 
        price: 120000, 
        description: "Nho đen từ Úc, ngọt đậm và không hạt.",
        image: "/images/nho-den-uc.jpg",
        inStock: true
    },
    { 
        id: 6, 
        name: "Thanh Long Ruột Đỏ", 
        category: "Trái Cây Trong Nước", 
        price: 35000, 
        description: "Thanh long ruột đỏ giàu vitamin và khoáng chất, tốt cho sức khỏe.",
        image: "/images/thanh-long.jpg",
        inStock: true
    },
    { 
        id: 7, 
        name: "Dâu Tây Đà Lạt", 
        category: "Trái Cây Trong Nước", 
        price: 150000, 
        description: "Dâu tây tươi ngon từ Đà Lạt, có vị chua ngọt dễ ăn.",
        image: "/images/dau-tay.jpg",
        inStock: false
    },
    { 
        id: 8, 
        name: "Lê Hàn Quốc", 
        category: "Trái Cây Nhập Khẩu", 
        price: 90000, 
        description: "Lê Hàn Quốc giòn và thơm, được nhập khẩu từ Hàn Quốc.",
        image: "/images/le-han.jpg",
        inStock: true
    },
    { 
        id: 9, 
        name: "Măng Cụt Thái Lan", 
        category: "Trái Cây Nhập Khẩu", 
        price: 70000, 
        description: "Măng cụt tươi ngon, có vị chua ngọt đặc trưng.",
        image: "/images/mang-cut.jpg",
        inStock: false
    },
    { 
        id: 10, 
        name: "Ổi Sạch Việt Nam", 
        category: "Trái Cây Trong Nước", 
        price: 20000, 
        description: "Ổi tươi, không hóa chất, an toàn và bổ dưỡng.",
        image: "/images/oi-vn.jpg",
        inStock: true
    },
    
];

export default products;
