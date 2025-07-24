export const selectWishlistItems = (state) => state.wishlist.wishlistItems;

export const selectIsInWishlist = (state, productId) =>
  state.wishlist.wishlistItems.some((item) => item._id === productId);

export const selectWishlistCount = (state) => state.wishlist.wishlistItems.length;
