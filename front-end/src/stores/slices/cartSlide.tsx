import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  userId: string | null;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  userId: null,
};

// The cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartData: (state, action: PayloadAction<CartState>) => {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice = action.payload.totalPrice;
      state.userId = action.payload.userId;
    },
/*************  ✨ Codeium Command ⭐  *************/
/**
 * Adds an item to the cart. If the item already exists, increases its quantity by 1.
 * Otherwise, adds the item to the cart with a default quantity of 1.
 * Updates the total quantity and total price of the cart accordingly.
 *
 * @param {CartState} state - The current state of the cart.
/******  39da4b98-b59b-4c64-a03f-1b43e6e34622  *******/
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += item.price;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        const item = state.items[index];
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.items.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

// Add selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectTotalPrice = (state: { cart: CartState }) => state.cart.totalPrice;
export const selectTotalQuantity = (state: { cart: CartState }) => state.cart.totalQuantity;

export const {
  setCartData,
  addItem,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
  setUserId,
} = cartSlice.actions;

export default cartSlice.reducer;
