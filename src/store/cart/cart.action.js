import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
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

export const setIsCartOpen = (bool) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemToCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
