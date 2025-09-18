import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from '../src/components/common/LoadingSpinner/LoadingSpinner';

describe('LoadingSpinner Component Tests', () => {
  // Test that the component renders correctly with default props
  test('should render with default props', () => {
    const { getByRole } = render(<LoadingSpinner />);
    const spinner = getByRole('status');

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('w-8 h-8 text-blue-600 animate-spin');
  });

  // Test rendering with different sizes
  describe('Size prop tests', () => {
    test.each([
      ['small', 'w-4 h-4'],
      ['medium', 'w-8 h-8'],
      ['large', 'w-12 h-12'],
    ])('should render with size %s', (size, expectedClass) => {
      const { getByRole } = render(<LoadingSpinner size={size} />);
      const spinner = getByRole('status');

      expect(spinner).toHaveClass(expectedClass);
    });

    test('should default to medium size when an invalid size is provided', () => {
      const { getByRole } = render(<LoadingSpinner size="invalid" />);
      const spinner = getByRole('status');

      expect(spinner).toHaveClass('w-8 h-8'); // Default size
    });
  });

  // Test rendering with different colors
  describe('Color prop tests', () => {
    test.each([
      ['blue', 'text-blue-600'],
      ['gray', 'text-gray-600'],
      ['white', 'text-white'],
    ])('should render with color %s', (color, expectedClass) => {
      const { getByRole } = render(<LoadingSpinner color={color} />);
      const spinner = getByRole('status');

      expect(spinner).toHaveClass(expectedClass);
    });

    test('should default to blue color when an invalid color is provided', () => {
      const { getByRole } = render(<LoadingSpinner color="invalid" />);
      const spinner = getByRole('status');

      expect(spinner).toHaveClass('text-blue-600'); // Default color
    });
  });

  // Test rendering without props
  test('should render correctly without any props', () => {
    const { getByRole } = render(<LoadingSpinner />);
    const spinner = getByRole('status');

    expect(spinner).toHaveClass('w-8 h-8 text-blue-600 animate-spin');
  });

  // Snapshot testing for the loading spinner
  test('should match snapshot', () => {
    const { asFragment } = render(<LoadingSpinner />);
    expect(asFragment()).toMatchSnapshot();
  });

  // Edge case: Test rendering with null and undefined props
  test('should render correctly with null size and color', () => {
    const { getByRole } = render(<LoadingSpinner size={null} color={null} />);
    const spinner = getByRole('status');

    expect(spinner).toHaveClass('w-8 h-8 text-blue-600 animate-spin'); // defaults should apply
  });

  test('should render correctly with undefined size and color', () => {
    const { getByRole } = render(<LoadingSpinner size={undefined} color={undefined} />);
    const spinner = getByRole('status');

    expect(spinner).toHaveClass('w-8 h-8 text-blue-600 animate-spin'); // defaults should apply
  });
});