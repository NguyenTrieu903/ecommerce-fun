// Import the function to test
import { setTitle } from '../src/utils/setTitle';

describe('src/utils/setTitle.js Tests', () => {
  // This will mock the document.title before each test
  beforeEach(() => {
    Object.defineProperty(document, 'title', {
      writable: true,
      value: '',
    });
  });

  describe('setTitle function', () => {
    test('should set title correctly for valid input', () => {
      const title = 'My Custom Title';
      setTitle(title);
      expect(document.title).toBe('My Custom Title - MegaMart');
    });

    test('should set title correctly with leading and trailing spaces', () => {
      const title = '   My Custom Title   ';
      setTitle(title);
      expect(document.title).toBe('My Custom Title - MegaMart');
    });

    test.each([
      [null, 'MegaMart - Your One-Stop Shop'],
      [undefined, 'MegaMart - Your One-Stop Shop'],
      ['', 'MegaMart - Your One-Stop Shop'],
      ['   ', 'MegaMart - Your One-Stop Shop'],
    ])('should set default title for invalid input: %s', (input) => {
      setTitle(input);
      expect(document.title).toBe('MegaMart - Your One-Stop Shop');
    });

    test('should handle empty string correctly', () => {
      setTitle('');
      expect(document.title).toBe('MegaMart - Your One-Stop Shop');
    });

    test('should handle whitespace string correctly', () => {
      setTitle('     ');
      expect(document.title).toBe('MegaMart - Your One-Stop Shop');
    });

    test('should handle numeric input by converting to string', () => {
      const title = 12345; // Number input
      setTitle(title);
      expect(document.title).toBe('12345 - MegaMart');
    });

    test('should handle boolean input by converting to string', () => {
      setTitle(true); // Boolean input
      expect(document.title).toBe('true - MegaMart');
      setTitle(false); // Boolean input
      expect(document.title).toBe('false - MegaMart');
    });
  });
});