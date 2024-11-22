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
export const fetchOrderHistory = createAsyncThunk(
    'orderHistory/fetchOrderHistory',
    async (userId: string) => {
        const response = await axios.get(`http://localhost:5000/orders?userId=${userId}`);
        return response.data;
    }
);

const orderHistorySlice = createSlice({
    name: 'orderHistory',
    initialState,
    reducers: {
       
        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrderHistory.fulfilled, (state, action) => {
            state.orders = action.payload;
        });
    }
});

export const { addOrder } = orderHistorySlice.actions;
export default orderHistorySlice.reducer;
