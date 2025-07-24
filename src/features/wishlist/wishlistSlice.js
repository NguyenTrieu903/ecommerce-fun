import { createSlice } from "@reduxjs/toolkit";

// Load wishlist from localStorage on initialization
const loadWishlistFromStorage = () => {
  try {
    const wishlist = localStorage.getItem("wishlist");
    return wishlist ? JSON.parse(wishlist) : [];
  } catch (error) {
    return [];
  }
};

const initialState = {
  wishlistItems: loadWishlistFromStorage(),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.wishlistItems.find(
        (item) => item._id === newItem._id
      );

      if (!existingItem) {
        state.wishlistItems.push(newItem);
        // Save to localStorage
        localStorage.setItem("wishlist", JSON.stringify(state.wishlistItems));
      }
    },
    removeFromWishlist: (state, action) => {
      const itemId = action.payload;
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item._id !== itemId
      );
      // Save to localStorage
      localStorage.setItem("wishlist", JSON.stringify(state.wishlistItems));
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
      localStorage.removeItem("wishlist");
    },
  },
});

export default wishlistSlice.reducer;
export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
