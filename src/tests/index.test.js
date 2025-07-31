import LoadingSpinner from './LoadingSpinner';

describe('src/components/common/LoadingSpinner/index.js Tests', () => {
  beforeEach(() => {
    // Reset mocks or any state before each test if necessary
  });

  describe('LoadingSpinner Component', () => {
    test('should be defined', () => {
      // Verify that the LoadingSpinner component is defined
      expect(LoadingSpinner).toBeDefined();
    });

    test('should be a functional component', () => {
      // Ensure that LoadingSpinner is a function (functional component)
      expect(typeof LoadingSpinner).toBe('function');
    });

    test('should render correctly without crashing', () => {
      // Check if the component renders without throwing an error
      const { container } = render(<LoadingSpinner />);
      expect(container).toBeTruthy();
    });

    test('should match snapshot', () => {
      // Snapshot testing for UI consistency
      const { asFragment } = render(<LoadingSpinner />);
      expect(asFragment()).toMatchSnapshot();
    });

    describe('props validation', () => {
      test('should accept valid props', () => {
        // Test with valid props (if applicable)
        const { container } = render(<LoadingSpinner size="large" />);
        expect(container.querySelector('.loading-spinner')).toHaveClass('large');
      });

      test('should handle incorrect props gracefully', () => {
        // Test with incorrect props to ensure no crash occurs
        const { container } = render(<LoadingSpinner size={null} />);
        expect(container).toBeTruthy(); // should still render without crashing
      });
    });

    describe('loading state', () => {
      test('should show loading indicator when loading is true', () => {
        const { getByText } = render(<LoadingSpinner loading={true} />);
        expect(getByText(/loading/i)).toBeInTheDocument();
      });

      test('should not show loading indicator when loading is false', () => {
        const { queryByText } = render(<LoadingSpinner loading={false} />);
        expect(queryByText(/loading/i)).not.toBeInTheDocument();
      });
    });
  });
});