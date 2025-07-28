import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { WishlistButton } from '../../components/user/WishlistButton/WishlistButton';
import wishlistReducer from '../../features/wishlist/wishlistSlice';

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
}));

const mockProduct = {
  _id: '1',
  name: 'Test Product',
  price: 99.99,
  picture: 'test.jpg',
};

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      wishlist: wishlistReducer,
    },
    preloadedState: {
      wishlist: { wishlistItems: [] },
      ...initialState,
    },
  });
};

const renderWithProvider = (component, store) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('WishlistButton', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders wishlist button', () => {
    const store = createMockStore();
    renderWithProvider(<WishlistButton product={mockProduct} />, store);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('shows empty heart when product not in wishlist', () => {
    const store = createMockStore();
    renderWithProvider(<WishlistButton product={mockProduct} />, store);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title', 'Add to wishlist');
  });

  test('shows filled heart when product is in wishlist', () => {
    const store = createMockStore({
      wishlist: { wishlistItems: [mockProduct] },
    });
    renderWithProvider(<WishlistButton product={mockProduct} />, store);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title', 'Remove from wishlist');
  });

  test.skip('adds product to wishlist when clicked', () => {
    const store = createMockStore();
    renderWithProvider(<WishlistButton product={mockProduct} />, store);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const state = store.getState();
    expect(state.wishlist.wishlistItems).toHaveLength(1);
    expect(state.wishlist.wishlistItems[0]).toEqual(mockProduct);
  });

  test.skip('removes product from wishlist when clicked', () => {
    const store = createMockStore({
      wishlist: { wishlistItems: [mockProduct] },
    });
    renderWithProvider(<WishlistButton product={mockProduct} />, store);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const state = store.getState();
    expect(state.wishlist.wishlistItems).toHaveLength(0);
  });
});
