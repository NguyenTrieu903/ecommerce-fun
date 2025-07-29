import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from '../src/components/common/LoadingSpinner/LoadingSpinner';

describe('LoadingSpinner Component Tests', () => {
  // This runs before each test in the suite
  beforeEach(() => {
    // Any necessary setup can be done here
  });

  // Test for rendering with default props
  describe('Rendering with default props', () => {
    test('should render LoadingSpinner with default size and color', () => {
      const { getByRole } = render(<LoadingSpinner />);
      const spinner = getByRole('status');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass('w-8 h-8 text-blue-600');
    });
  });

  // Test for rendering with custom props
  describe('Rendering with custom props', () => {
    test('should render LoadingSpinner with small size', () => {
      const { getByRole } = render(<LoadingSpinner size="small" />);
      const spinner = getByRole('status');
      expect(spinner).toHaveClass('w-4 h-4');
    });

    test('should render LoadingSpinner with large size', () => {
      const { getByRole } = render(<LoadingSpinner size="large" />);
      const spinner = getByRole('status');
      expect(spinner).toHaveClass('w-12 h-12');
    });

    test('should render LoadingSpinner with gray color', () => {
      const { getByRole } = render(<LoadingSpinner color="gray" />);
      const spinner = getByRole('status');
      expect(spinner).toHaveClass('text-gray-600');
    });

    test('should render LoadingSpinner with white color', () => {
      const { getByRole } = render(<LoadingSpinner color="white" />);
      const spinner = getByRole('status');
      expect(spinner).toHaveClass('text-white');
    });
  });

  // Edge case tests for invalid props
  describe('Handling invalid props', () => {
    test('should fall back to default size for invalid size', () => {
      const { getByRole } = render(<LoadingSpinner size="invalid" />);
      const spinner = getByRole('status');
      expect(spinner).toHaveClass('w-8 h-8'); // Default size
    });

    test('should fall back to default color for invalid color', () => {
      const { getByRole } = render(<LoadingSpinner color="invalid" />);
      const spinner = getByRole('status');
      expect(spinner).toHaveClass('text-blue-600'); // Default color
    });
  });

  // Snapshot testing to ensure UI does not change unexpectedly
  describe('Snapshot tests', () => {
    test('should match the snapshot for default props', () => {
      const { asFragment } = render(<LoadingSpinner />);
      expect(asFragment()).toMatchSnapshot();
    });

    test('should match the snapshot for small size and gray color', () => {
      const { asFragment } = render(<LoadingSpinner size="small" color="gray" />);
      expect(asFragment()).toMatchSnapshot();
    });

    test('should match the snapshot for large size and white color', () => {
      const { asFragment } = render(<LoadingSpinner size="large" color="white" />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});