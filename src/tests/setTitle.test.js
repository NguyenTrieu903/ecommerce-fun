import { setTitle } from '../src/utils/setTitle';

describe('src/utils/setTitle.js Tests', () => {
  // Set up a mock for document.title before each test
  beforeEach(() => {
    // Reset document.title to a known state before each test
    document.title = '';
  });

  describe('setTitle function', () => {
    test('should set document.title correctly for a valid title', () => {
      const title = 'Home';
      setTitle(title);
      expect(document.title).toBe('Home - MegaMart');
    });

    test('should trim whitespace from the title', () => {
      const title = '   Products   ';
      setTitle(title);
      expect(document.title).toBe('Products - MegaMart');
    });

    test('should handle an empty string input', () => {
      setTitle('');
      expect(document.title).toBe('MegaMart - Your One-Stop Shop');
    });

    test('should handle null input', () => {
      setTitle(null);
      expect(document.title).toBe('MegaMart - Your One-Stop Shop');
    });

    test('should handle undefined input', () => {
      setTitle(undefined);
      expect(document.title).toBe('MegaMart - Your One-Stop Shop');
    });

    test('should handle a string with only whitespace', () => {
      setTitle('   ');
      expect(document.title).toBe('MegaMart - Your One-Stop Shop');
    });

    test.each([
      ['   Title with leading and trailing spaces   ', 'Title with leading and trailing spaces - MegaMart'],
      ['Special & Characters!', 'Special & Characters! - MegaMart'],
      ['12345', '12345 - MegaMart'],
    ])('should correctly set title for various valid inputs: %s', (input, expected) => {
      setTitle(input);
      expect(document.title).toBe(expected);
    });

    test('should reset title to default if input is invalid', () => {
      const invalidTitles = [null, undefined, '', '   '];
      invalidTitles.forEach((title) => {
        setTitle(title);
        expect(document.title).toBe('MegaMart - Your One-Stop Shop');
      });
    });
  });
});