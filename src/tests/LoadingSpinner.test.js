import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('src/components/common/LoadingSpinner/LoadingSpinner.js Tests', () => {
  // Group for testing default props and standard behavior
  describe('Default Rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(<LoadingSpinner />);
      expect(container).toBeInTheDocument();
    });

    it('renders with default size and color', () => {
      const { getByRole } = render(<LoadingSpinner />);
      const spinner = getByRole('status');
      expect(spinner).toHaveClass('w-8 h-8');
      expect(spinner).toHaveClass('text-blue-600');
    });
  });

  // Group for testing size prop variations
  describe('Size Prop Variations', () => {
    it('renders correctly when size is small', () => {
      const { getByRole } = render(<LoadingSpinner size="small" />);
      const spinner = getByRole('status');
      expect(spinner).toHaveClass('w-4 h-4');
    });

    it('renders correctly when size is medium', () => {
      const { getByRole } = render(<LoadingSpinner size="medium" />);
      const spinner = getByRole('status');
      expect(spinner).toHaveClass('w-8 h-8');
    });

    it('renders correctly when size is large', () => {
      const { getByRole } = render(<LoadingSpinner size="large" />);
      const spinner = getByRole('status');
      expect(spinner).toHaveClass('w-12 h-12');
    });

    it('defaults to medium size if invalid size is provided', () => {
      const { getByRole } = render(<LoadingSpinner size="invalid" />);
      const spinner = getByRole('status');
      expect(spinner).toHaveClass('w-8 h-8');
    });
  });

  // Group for testing color prop variations
  describe('Color Prop Variations', () => {
    it('renders correctly when color is blue', () => {
      const { getByRole } = render(<LoadingSpinner color="blue" />);
      const spinner = getByRole('status');
      expect(spinner).toHaveClass('text-blue-600');
    });

    it('renders correctly when color is gray', () => {
      const { getByRole } = render(<LoadingSpinner color="gray" />);
      const spinner = getByRole('status');
      expect(spinner).toHaveClass('text-gray-600');
    });

    it('renders correctly when color is white', () => {
      const { getByRole } = render(<LoadingSpinner color="white" />);
      const spinner = getByRole('status');
      expect(spinner).toHaveClass('text-white');
    });

    it('defaults to blue if an invalid color is provided', () => {
      const { getByRole } = render(<LoadingSpinner color="invalid" />);
      const spinner = getByRole('status');
      expect(spinner).toHaveClass('text-blue-600');
    });
  });

  // Group for testing combined prop variations
  describe('Combined Size and Color Prop Variations', () => {
    it('renders correctly with small size and gray color', () => {
      const { getByRole } = render(<LoadingSpinner size="small" color="gray" />);
      const spinner = getByRole('status');
      expect(spinner).toHaveClass('w-4 h-4 text-gray-600');
    });

    it('renders correctly with large size and white color', () => {
      const { getByRole } = render(<LoadingSpinner size="large" color="white" />);
      const spinner = getByRole('status');
      expect(spinner).toHaveClass('w-12 h-12 text-white');
    });
  });

  // Group for testing accessibility
  describe('Accessibility Tests', () => {
    it('should have role "status" for accessibility', () => {
      const { getByRole } = render(<LoadingSpinner />);
      const spinner = getByRole('status');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute('aria-label', 'Loading');
    });
  });
});