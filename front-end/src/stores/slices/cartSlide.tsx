// src/slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'; // Import RootState nếu bạn có cấu trúc store

interface CartItem {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
}

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity'> | CartItem>) => {
            const newItem: CartItem = {
                ...action.payload,
                quantity: 'quantity' in action.payload ? action.payload.quantity : 1,
            };

            const existingItem = state.items.find(item => item.id === newItem.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push(newItem);
            }
            state.totalQuantity += 1;
            state.totalPrice += newItem.price;
        },
        removeItem: (state, action: PayloadAction<number>) => {
            const index = state.items.findIndex(item => item.id === action.payload);
            if (index !== -1) {
                const itemToRemove = state.items[index];
                state.totalQuantity -= itemToRemove.quantity;
                state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
                state.items.splice(index, 1);
            }
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const itemToUpdate = state.items.find(item => item.id === action.payload.id);
            if (itemToUpdate && action.payload.quantity > 0) {
                state.totalQuantity += action.payload.quantity - itemToUpdate.quantity;
                state.totalPrice += (action.payload.quantity - itemToUpdate.quantity) * itemToUpdate.price;
                itemToUpdate.quantity = action.payload.quantity;
            }
        },
        increaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
                state.totalQuantity += 1;
                state.totalPrice += item.price;
            }
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                state.totalQuantity -= 1;
                state.totalPrice -= item.price;
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
    },
});

// Selector to get cart items
export const selectCartItems = (state: RootState) => state.cart.items;

// Selector to get total quantity of items in the cart
export const selectTotalQuantity = (state: RootState) => state.cart.totalQuantity;

// Selector to get total price of items in the cart
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;

export const { addItem, removeItem, updateQuantity, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
