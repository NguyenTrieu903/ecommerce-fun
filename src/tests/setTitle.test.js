import { setTitle } from '../src/utils/setTitle';

describe('src/utils/setTitle.js Tests', () => {
  // This will store the original document title before each test
  const originalTitle = document.title;

  beforeEach(() => {
    // Reset the document title before each test
    document.title = originalTitle;
  });

  afterEach(() => {
    // Restore the original title after each test
    document.title = originalTitle;
  });

  describe('setTitle', () => {
    test('should set the document title correctly when given a valid title', () => {
      const title = 'New Product';
      setTitle(title);
      expect(document.title).toBe('New Product - MegaMart');
    });

    test('should trim whitespace from the title', () => {
      const title = '   New Category   ';
      setTitle(title);
      expect(document.title).toBe('New Category - MegaMart');
    });

    test('should set the default title when given an empty string', () => {
      setTitle('');
      expect(document.title).toBe('MegaMart - Your One-Stop Shop');
    });

    test('should set the default title when given null', () => {
      setTitle(null);
      expect(document.title).toBe('MegaMart - Your One-Stop Shop');
    });

    test('should set the default title when given undefined', () => {
      setTitle(undefined);
      expect(document.title).toBe('MegaMart - Your One-Stop Shop');
    });

    test('should set the default title when given a non-string type', () => {
      setTitle(123);
      expect(document.title).toBe('MegaMart - Your One-Stop Shop');
    });

    test('should set the default title when given a non-trimmed string with only whitespace', () => {
      setTitle('     ');
      expect(document.title).toBe('MegaMart - Your One-Stop Shop');
    });

    test.each([
      ['Valid Title', 'Valid Title - MegaMart'],
      ['Another Title', 'Another Title - MegaMart'],
      ['   Title with Spaces   ', 'Title with Spaces - MegaMart'],
    ])('should set the document title to "%s" correctly', (input, expected) => {
      setTitle(input);
      expect(document.title).toBe(expected);
    });
  });
});