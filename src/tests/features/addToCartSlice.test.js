import cartReducer, { addToCart, increaseQty, decreaseQty, removeCart } from '../../features/cart/addToCartSlice';

describe('cart slice', () => {
  const initialState = {
    cartItems: [],
  };
  
  const mockProduct = {
    _id: '123',
    name: 'Test Product',
    price: 10.99,
    picture: 'test.jpg',
  };

  test('should return the initial state', () => {
    expect(cartReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test('should add new item to cart', () => {
    const newState = cartReducer(initialState, addToCart(mockProduct));
    
    expect(newState.cartItems).toHaveLength(1);
    expect(newState.cartItems[0]).toEqual({
      ...mockProduct,
      quantity: 1,
    });
  });

  test('should increase quantity of existing item in cart', () => {
    const stateWithItem = {
      cartItems: [{ ...mockProduct, quantity: 1 }],
    };
    
    const newState = cartReducer(stateWithItem, addToCart(mockProduct));
    
    expect(newState.cartItems).toHaveLength(1);
    expect(newState.cartItems[0].quantity).toBe(2);
  });

  test('should increase quantity with increaseQty', () => {
    const stateWithItem = {
      cartItems: [{ ...mockProduct, quantity: 1 }],
    };
    
    const newState = cartReducer(
      stateWithItem, 
      increaseQty({ id: '123', data: 3 })
    );
    
    expect(newState.cartItems[0].quantity).toBe(3);
  });

  test('should decrease quantity with decreaseQty', () => {
    const stateWithItem = {
      cartItems: [{ ...mockProduct, quantity: 3 }],
    };
    
    const newState = cartReducer(
      stateWithItem, 
      decreaseQty({ id: '123', data: 2 })
    );
    
    expect(newState.cartItems[0].quantity).toBe(2);
  });

  test('should remove item from cart', () => {
    const stateWithItem = {
      cartItems: [{ ...mockProduct, quantity: 1 }],
    };
    
    const newState = cartReducer(stateWithItem, removeCart('123'));
    
    expect(newState.cartItems).toHaveLength(0);
  });
});
