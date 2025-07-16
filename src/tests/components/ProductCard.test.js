import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ProductCard } from '../../components/user/ProductCard';
import { configureStore } from '@reduxjs/toolkit';
import addToCartReducer from '../../features/cart/addToCartSlice';
import * as toast from 'react-hot-toast';

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
}));

// Create a mock store
const mockStore = configureStore({
  reducer: {
    cart: addToCartReducer,
  },
});

// Mock product data
const mockProduct = {
  _id: '1',
  name: 'Test Product',
  price: 99.99,
  description: 'This is a test product description for testing purposes',
  picture: 'test-image.jpg',
};

describe('ProductCard Component', () => {
  const renderWithProviders = (product = mockProduct) => {
    return render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <ProductCard product={product} />
        </BrowserRouter>
      </Provider>
    );
  };

  test('renders product information correctly', () => {
    renderWithProviders();
    
    // Check if product name is displayed
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    
    // Check if product price is displayed
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    
    // Check if truncated description is displayed
    expect(screen.getByText(/his is a test product description for testin/)).toBeInTheDocument();
    
    // Check if image is present with correct source
    const image = screen.getByAltText('product');
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('test-image.jpg');
  });
});
