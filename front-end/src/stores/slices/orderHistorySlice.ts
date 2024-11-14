// stores/slices/orderHistorySlice.js
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Order {
    id: number;
    date: string;
    total: number;
    status: string;
}

interface OrderState {
    orders: Order[];
}

const initialState: OrderState = {
    orders: [],
};
// Thunk để lấy dữ liệu lịch sử đơn hàng từ API
export const fetchOrderHistory = createAsyncThunk('orderHistory/fetchOrderHistory', async () => {
    const response = await axios.get('https://localhost:5000/orders');
    return response.data; // giả sử dữ liệu trả về là một mảng đơn hàng
});
const orderHistorySlice = createSlice({
    name: 'orderHistory',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.push(action.payload);
        },
    },
});

export const { addOrder } = orderHistorySlice.actions;
export default orderHistorySlice.reducer;
