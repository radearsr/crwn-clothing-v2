import { createSlice } from "@reduxjs/toolkit";

const CART_INITIAL_STATE = {
  cartItems: [],
  isCartOpen: false,
};

const addCartItem = (cartItems, productToAdd) => {
  console.log({ cartItems, productToAdd });
  const existingCartItem = cartItems.find((item) => item.id === productToAdd.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) => 
    cartItem.id === productToAdd.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 } 
      : cartItem);
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }]
};

const removeCartItem = (cartItems, itemToRemove) => {
  const existingCartItem = cartItems.find((item) => item.id === itemToRemove.id);

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== existingCartItem.id);
  }

  return cartItems.map((cartItem) => 
  cartItem.id === itemToRemove.id
    ? { ...cartItem, quantity: cartItem.quantity - 1 } 
    : cartItem);
};

const clearCartItem = (cartItems, cartItemToClear) => (
  cartItems.filter((item) => item.id !== cartItemToClear.id)
);

const cartSlice = createSlice({
  name: "cart",
  initialState: CART_INITIAL_STATE,
  reducers: {
    addItemToCart: (state, action) => {
      console.log(action);
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    removeItemToCart: (state, action) => {
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },
    clearItemFromCart: (state, action) => {
      state.cartItems = clearCartItem(state.cartItems, action.payload);
    },
    setIsCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },
  }
});

export const { addItemToCart, removeItemToCart, clearItemFromCart, setIsCartOpen } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;