import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import addToCartSliceReducer from "../features/cart/addToCartSlice";
import cartOpenSliceReducer from "../features/cart/cartOpenSlice";
import sidebarSliceReducer from "../features/sidebar/sidebarSlice";
import userAuthSliceReducer from "../features/auth/userAuthSlice";
import wishlistSliceReducer from "../features/wishlist/wishlistSlice";

export const store = configureStore({
  reducer: {
    sidebarMenu: sidebarSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    adminAuth: authSliceReducer,
    userAuth: userAuthSliceReducer,
    cartOpen: cartOpenSliceReducer,
    cartItems: addToCartSliceReducer,
    wishlist: wishlistSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
