// src/slices/productsSlice.ts
import { createSlice } from '@reduxjs/toolkit';

export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

interface ProductsState {
    items: Product[];
}

const initialState: ProductsState = {
    items: [
        { id: 1, name: "Táo", price: 30000, imageUrl: "/assets/apple.jpg" },
        { id: 2, name: "Cam", price: 40000, imageUrl: "/assets/orange.jpg" },
        { id: 3, name: "Chuối", price: 20000, imageUrl: "/assets/banana.jpg" },
        { id: 4, name: "Xoa", price: 50000, imageUrl: "/assets/grape.jpg" },
        { id: 5, name: "Kiwi", price: 60000, imageUrl: "/assets/kiwi.jpg" },
        { id: 6, name: "Các mặt", price: 10000, imageUrl: "/assets/pineapple.jpg" },
        { id: 7, name: "Quát", price: 70000, imageUrl: "/assets/strawberry.jpg" },
        { id: 8, name: "Tôm", price: 80000, imageUrl: "/assets/tomato.jpg" },
        { id: 9, name: "Táo Mỹ", price: 50000, imageUrl: "/assets/avocado.jpg" },
        { id: 10, name: "Nho", price: 15000, imageUrl: "/assets/pear.jpg" },
        { id: 11, name: "Nho Đen Úc", price: 120000, imageUrl: "/assets/peach.jpg" },
        { id: 12, name: "Chanh", price: 10000, imageUrl: "/assets/lemon.jpg" },
        { id: 13, name: "Nho Hóa", price: 15000, imageUrl: "/assets/papaya.jpg" },
        { id: 14, name: "Củ", price: 20000, imageUrl: "/assets/watermelon.jpg" },
        { id: 15, name: "Quả Cam", price: 40000, imageUrl: "/assets/grapefruit.jpg" },
        { id: 16, name: "Quả Xoài", price: 50000, imageUrl: "/assets/orange-juice.jpg" },
        { id: 17, name: "Quả Chính", price: 30000, imageUrl: "/assets/lemonade.jpg" },
        { id: 18, name: "Quả Chính", price: 30000, imageUrl: "/assets/lemonade.jpg" },
        { id: 19, name: "Quả Chính", price: 30000, imageUrl: "/assets/lemonade.jpg" },
        { id: 20, name: "Quả Chính", price: 30000, imageUrl: "/assets/lemonade.jpg" },
        { id: 21, name: "Quả Chính", price: 30000, imageUrl: "/assets/lemonade.jpg" },
        { id: 22, name: "Quả Chính", price: 30000, imageUrl: "/assets/lemonade.jpg" },
        { id: 23, name: "Quả Chính", price: 30000, imageUrl: "/assets/lemonade.jpg" },
        { id: 24, name: "Quả Chính", price: 30000, imageUrl: "/assets/lemonade.jpg" },
        { id: 25, name: "Quả Chính", price: 30000, imageUrl: "/assets/lemonade.jpg" },
        { id: 26, name: "Quả Chính", price: 30000, imageUrl: "/assets/lemonade.jpg" },
        { id: 27, name: "Quả Chính", price: 30000, imageUrl: "/assets/lemonade.jpg" },
        { id: 28, name: "Quả Chính", price: 30000, imageUrl: "/assets/lemonade.jpg" },
        { id: 29, name: "Quả Chính", price: 30000, imageUrl: "/assets/lemonade.jpg" },
        { id: 30, name: "Quả Chính", price: 30000, imageUrl: "/assets/lemonade.jpg" },
        

        
        
    ],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
});

export const selectProducts = (state: { products: ProductsState }) => state.products.items;

export default productsSlice.reducer;
