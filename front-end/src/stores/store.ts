// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlide';
import orderHistoryReducer from './slices/orderHistorySlice';

const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        orderHistory: orderHistoryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
