// src/components/common/LoadingSpinner/index.test.tsx

import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner'; // Assuming this is the actual component
import '@testing-library/jest-dom/extend-expect'; // for additional matchers

describe('src/components/common/LoadingSpinner/index.js Tests', () => {
  beforeEach(() => {
    // Any setup can be done here
  });

  describe('LoadingSpinner Component', () => {
    test('should render without crashing', () => {
      render(<LoadingSpinner />);
      // Assert that the spinner is visible
      const spinnerElement = document.querySelector('.loading-spinner'); // Assuming a class name for the spinner
      expect(spinnerElement).toBeInTheDocument();
    });

    test('should show the correct loading message when provided', () => {
      const { getByText } = render(<LoadingSpinner message="Loading..." />);
      expect(getByText("Loading...")).toBeInTheDocument(); // Assuming there's a message prop
    });

    test('should match snapshot', () => {
      const { asFragment } = render(<LoadingSpinner />);
      expect(asFragment()).toMatchSnapshot(); // Ensure the UI matches the latest version
    });

    test('should handle null and undefined props gracefully', () => {
      const { container } = render(<LoadingSpinner message={null} />);
      expect(container.firstChild).toBeInTheDocument(); // Spinner should still render
      
      const { container: containerUndefined } = render(<LoadingSpinner message={undefined} />);
      expect(containerUndefined.firstChild).toBeInTheDocument(); // Spinner should still render
    });

    test('should handle empty string message prop', () => {
      const { queryByText } = render(<LoadingSpinner message="" />);
      expect(queryByText("")).not.toBeInTheDocument(); // No message should be displayed
    });
  });

  // Integration tests for component rendering
  describe('LoadingSpinner Integration Tests', () => {
    test('should integrate correctly within a parent component', () => {
      const { getByText } = render(
        <div>
          <LoadingSpinner message="Loading..." />
        </div>
      );
      expect(getByText("Loading...")).toBeInTheDocument(); // Ensure it integrates well within other elements
    });
  });

  // Edge case tests
  describe('LoadingSpinner Edge Cases', () => {
    test('should not throw error when no props are provided', () => {
      expect(() => render(<LoadingSpinner />)).not.toThrow(); // Should render without props
    });
  });
});