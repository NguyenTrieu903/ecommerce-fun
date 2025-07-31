import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from '../src/components/common/LoadingSpinner/LoadingSpinner';

describe('LoadingSpinner Component Tests', () => {
  // Base setup for rendering the component
  const renderSpinner = (props = {}) => render(<LoadingSpinner {...props} />);

  describe('Default Props', () => {
    test('should render with default props', () => {
      const { getByRole } = renderSpinner();
      const spinner = getByRole('status');
      
      // Expect default size and color classes
      expect(spinner).toHaveClass('w-8 h-8 text-blue-600');
    });

    test('should have aria-label set to "Loading"', () => {
      const { getByRole } = renderSpinner();
      const spinner = getByRole('status');
      
      expect(spinner).toHaveAttribute('aria-label', 'Loading');
    });
  });

  describe('Size Prop', () => {
    test.each([
      ['small', 'w-4 h-4'],
      ['medium', 'w-8 h-8'], // Default case
      ['large', 'w-12 h-12'],
    ])('should render with size %s and appropriate classes', (size, expectedClass) => {
      const { getByRole } = renderSpinner({ size });
      const spinner = getByRole('status');

      expect(spinner).toHaveClass(expectedClass);
    });

    test('should default to medium size when invalid size is provided', () => {
      const { getByRole } = renderSpinner({ size: 'invalid-size' });
      const spinner = getByRole('status');

      expect(spinner).toHaveClass('w-8 h-8'); // Check for default medium size
    });
  });

  describe('Color Prop', () => {
    test.each([
      ['blue', 'text-blue-600'],
      ['gray', 'text-gray-600'],
      ['white', 'text-white'],
    ])('should render with color %s and appropriate classes', (color, expectedClass) => {
      const { getByRole } = renderSpinner({ color });
      const spinner = getByRole('status');

      expect(spinner).toHaveClass(expectedClass);
    });

    test('should default to blue color when invalid color is provided', () => {
      const { getByRole } = renderSpinner({ color: 'invalid-color' });
      const spinner = getByRole('status');

      expect(spinner).toHaveClass('text-blue-600'); // Check for default blue color
    });
  });

  describe('SVG Structure', () => {
    test('should contain an SVG element', () => {
      const { container } = renderSpinner();
      const svg = container.querySelector('svg');

      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    });

    test('should contain the correct circle and path elements', () => {
      const { container } = renderSpinner();
      const circle = container.querySelector('circle');
      const path = container.querySelector('path');

      expect(circle).toHaveAttribute('cx', '12');
      expect(circle).toHaveAttribute('cy', '12');
      expect(circle).toHaveAttribute('r', '10');
      expect(path).toHaveAttribute('fill', 'currentColor');
    });
  });
});