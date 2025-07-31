import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from '../src/components/common/LoadingSpinner/LoadingSpinner';

describe('LoadingSpinner Component Tests', () => {

  // Test for default rendering
  test('should render with default props', () => {
    const { getByRole } = render(<LoadingSpinner />);
    const spinner = getByRole('status');

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('w-8 h-8 text-blue-600');
  });

  // Test for size prop
  describe('Size Prop Tests', () => {
    test.each([
      ['small', 'w-4 h-4'],
      ['medium', 'w-8 h-8'],
      ['large', 'w-12 h-12'],
    ])('should render with size %s', (size, expectedClass) => {
      const { getByRole } = render(<LoadingSpinner size={size} />);
      const spinner = getByRole('status');

      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass(expectedClass);
    });

    test('should default to medium size when invalid size is provided', () => {
      const { getByRole } = render(<LoadingSpinner size="invalid-size" />);
      const spinner = getByRole('status');

      expect(spinner).toHaveClass('w-8 h-8');
    });
  });

  // Test for color prop
  describe('Color Prop Tests', () => {
    test.each([
      ['blue', 'text-blue-600'],
      ['gray', 'text-gray-600'],
      ['white', 'text-white'],
    ])('should render with color %s', (color, expectedClass) => {
      const { getByRole } = render(<LoadingSpinner color={color} />);
      const spinner = getByRole('status');

      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass(expectedClass);
    });

    test('should default to blue color when invalid color is provided', () => {
      const { getByRole } = render(<LoadingSpinner color="invalid-color" />);
      const spinner = getByRole('status');

      expect(spinner).toHaveClass('text-blue-600');
    });
  });

  // Test for accessibility
  test('should have role status and aria-label "Loading"', () => {
    const { getByRole } = render(<LoadingSpinner />);
    const spinner = getByRole('status');

    expect(spinner).toHaveAttribute('aria-label', 'Loading');
  });

  // Test snapshot rendering
  test('should match snapshot', () => {
    const { asFragment } = render(<LoadingSpinner />);
    expect(asFragment()).toMatchSnapshot();
  });

  // Performance Tests (if applicable)
  // This may not apply directly to the LoadingSpinner, but if it were 
  // to perform async actions or have complex calculations, we could measure that.
});