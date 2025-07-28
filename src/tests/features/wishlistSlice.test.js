import wishlistReducer, { 
  addToWishlist, 
  removeFromWishlist, 
  clearWishlist 
} from '../../features/wishlist/wishlistSlice';

describe('wishlist slice', () => {
  const initialState = {
    wishlistItems: [],
  };

  const mockProduct = {
    _id: '1',
    name: 'Test Product',
    price: 99.99,
    picture: 'test.jpg',
  };

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('should return the initial state', () => {
    expect(wishlistReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test('should handle addToWishlist', () => {
    const newState = wishlistReducer(
      initialState,
      addToWishlist(mockProduct)
    );
    
    expect(newState.wishlistItems).toHaveLength(1);
    expect(newState.wishlistItems[0]).toEqual(mockProduct);
  });

  test('should not add duplicate items to wishlist', () => {
    const stateWithItem = {
      wishlistItems: [mockProduct],
    };
    
    const newState = wishlistReducer(
      stateWithItem,
      addToWishlist(mockProduct)
    );
    
    expect(newState.wishlistItems).toHaveLength(1);
    expect(newState.wishlistItems[0]).toEqual(mockProduct);
  });

  test('should handle removeFromWishlist', () => {
    const stateWithItem = {
      wishlistItems: [mockProduct],
    };
    
    const newState = wishlistReducer(
      stateWithItem,
      removeFromWishlist(mockProduct._id)
    );
    
    expect(newState.wishlistItems).toHaveLength(0);
  });

  test('should handle clearWishlist', () => {
    const stateWithItems = {
      wishlistItems: [mockProduct, { ...mockProduct, _id: '2' }],
    };
    
    const newState = wishlistReducer(stateWithItems, clearWishlist());
    
    expect(newState.wishlistItems).toHaveLength(0);
  });
});
