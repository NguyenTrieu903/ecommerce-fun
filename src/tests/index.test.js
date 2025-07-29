import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner'; // Assuming the actual component is in the same directory
import '@testing-library/jest-dom/extend-expect';

describe('src/components/common/LoadingSpinner/index.js Tests', () => {
  beforeEach(() => {
    // Setup code can go here if needed
  });

  describe('LoadingSpinner Component', () => {
    
    test('should render without crashing', () => {
      const { container } = render(<LoadingSpinner />);
      expect(container).toBeInTheDocument();
    });

    test('should display loading text when provided as prop', () => {
      const { getByText } = render(<LoadingSpinner loadingText="Loading..." />);
      expect(getByText("Loading...")).toBeInTheDocument();
    });

    test('should not display loading text if not provided', () => {
      const { queryByText } = render(<LoadingSpinner />);
      expect(queryByText("Loading...")).not.toBeInTheDocument();
    });

    test('should apply custom className when provided', () => {
      const { container } = render(<LoadingSpinner className="custom-spinner" />);
      expect(container.firstChild).toHaveClass('custom-spinner');
    });

    test('should match snapshot', () => {
      const { asFragment } = render(<LoadingSpinner />);
      expect(asFragment()).toMatchSnapshot();
    });

    test.each([
      [undefined, "Loading..."],
      [null, "Loading..."],
      ["", "Loading..."],
    ])('should display default loading text for invalid loadingText prop: %s', (loadingText) => {
      const { getByText } = render(<LoadingSpinner loadingText={loadingText} />);
      expect(getByText("Loading...")).toBeInTheDocument();
    });
  });
});