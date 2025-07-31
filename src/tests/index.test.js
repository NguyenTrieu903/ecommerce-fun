import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('src/components/common/LoadingSpinner/index.js Tests', () => {
  // Render the LoadingSpinner component before each test
  const renderSpinner = (props = {}) => {
    return render(<LoadingSpinner {...props} />);
  };

  describe('LoadingSpinner Component', () => {
    test('should render without crashing', () => {
      renderSpinner();
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    test('should display a loading message when loading is true', () => {
      renderSpinner({ loading: true });
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test('should not display a loading message when loading is false', () => {
      renderSpinner({ loading: false });
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    test('should apply custom styles when provided', () => {
      const customStyles = { color: 'red' };
      renderSpinner({ loading: true, style: customStyles });
      const spinnerElement = screen.getByRole('status');
      expect(spinnerElement).toHaveStyle('color: red');
    });

    test('should handle edge case of null props gracefully', () => {
      renderSpinner(null);
      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    test('should handle undefined props gracefully', () => {
      renderSpinner(undefined);
      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    test('should match snapshot', () => {
      const { asFragment } = renderSpinner({ loading: true });
      expect(asFragment()).toMatchSnapshot();
    });
  });
});