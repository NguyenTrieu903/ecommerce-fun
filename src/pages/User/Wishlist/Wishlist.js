import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import { selectWishlistItems } from "../../../features/wishlist/wishlistSelectors";
import { removeFromWishlist, clearWishlist } from "../../../features/wishlist/wishlistSlice";
import { addToCart } from "../../../features/cart/addToCartSlice";
import { setTitle } from "../../../utils/setTitle";

export const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);

  // Set page title
  setTitle("My Wishlist");

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.success("Removed from wishlist!");
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Added to cart!");
  };

  const handleClearWishlist = () => {
    if (window.confirm("Are you sure you want to clear your entire wishlist?")) {
      dispatch(clearWishlist());
      toast.success("Wishlist cleared!");
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto my-10 px-4">
        <div className="text-center py-20">
          <FaHeart className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Start adding products you love to your wishlist!
          </p>
          <Link
            to="/"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          My Wishlist ({wishlistItems.length} items)
        </h1>
        {wishlistItems.length > 0 && (
          <button
            onClick={handleClearWishlist}
            className="flex items-center text-red-600 hover:text-red-800 transition duration-200"
          >
            <FaTrash className="mr-2" />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {wishlistItems.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200"
          >
            <div className="relative">
              <Link to={`/product-details/${product.slug}/${product._id}`}>
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/uploads/${product.picture}`}
                  alt={product.name}
                  className="w-full h-48 object-cover hover:scale-105 transition duration-200"
                />
              </Link>
              <button
                onClick={() => handleRemoveFromWishlist(product._id)}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
                title="Remove from wishlist"
              >
                <FaHeart className="text-sm" />
              </button>
            </div>

            <div className="p-4">
              <Link to={`/product-details/${product.slug}/${product._id}`}>
                <h3 className="text-sm font-medium text-gray-800 mb-2 hover:text-green-600 transition duration-200 line-clamp-2">
                  {product.name}
                </h3>
              </Link>

              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-semibold text-green-600">
                  ${product.price}
                </span>
                {product.discount > 0 && (
                  <span className="text-sm text-gray-500 line-through">
                    ${(product.price * (1 + product.discount / 100)).toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 flex items-center justify-center bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition duration-200 text-sm"
                >
                  <FaShoppingCart className="mr-2 text-xs" />
                  Add to Cart
                </button>
                <Link
                  to={`/product-details/${product.slug}/${product._id}`}
                  className="flex-1 text-center bg-gray-200 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300 transition duration-200 text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
