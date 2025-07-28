import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { selectIsInWishlist } from "../../../features/wishlist/wishlistSelectors";
import { addToWishlist, removeFromWishlist } from "../../../features/wishlist/wishlistSlice";

export const WishlistButton = ({ product, className = "", size = "md" }) => {
  const dispatch = useDispatch();
  const isInWishlist = useSelector((state) => selectIsInWishlist(state, product._id));

  const handleWishlistToggle = (e) => {
    e.preventDefault(); // Prevent navigation if button is inside a link
    e.stopPropagation(); // Prevent event bubbling

    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
      toast.success("Removed from wishlist!");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist!");
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "p-1 text-sm";
      case "lg":
        return "p-3 text-lg";
      default:
        return "p-2 text-base";
    }
  };

  return (
    <button
      onClick={handleWishlistToggle}
      className={`${getSizeClasses()} rounded-full transition duration-200 ${
        isInWishlist
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-gray-200 text-gray-600 hover:bg-red-500 hover:text-white"
      } ${className}`}
      title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isInWishlist ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};
