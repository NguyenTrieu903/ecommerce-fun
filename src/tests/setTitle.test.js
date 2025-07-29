// src/utils/setTitle.test.ts
import { setTitle } from './setTitle';

describe('src/utils/setTitle.js Tests', () => {
  // Reset document.title before each test
  beforeEach(() => {
    document.title = ''; // Clear the title before each test
  });

  describe('setTitle function', () => {
    test('should set the document title correctly for a valid string input', () => {
      const title = 'New Product';
      setTitle(title);
      expect(document.title).toBe('New Product - MegaMart');
    });

    test('should trim the title input before setting it', () => {
      const title = '  Sale Items  ';
      setTitle(title);
      expect(document.title).toBe('Sale Items - MegaMart');
    });

    test('should set the default title for an empty string input', () => {
      const title = '';
      setTitle(title);
      expect(document.title).toBe('MegaMart - Your One-Stop Shop');
    });

    test('should set the default title for a whitespace string input', () => {
      const title = '     ';
      setTitle(title);
      expect(document.title).toBe('MegaMart - Your One-Stop Shop');
    });

    test('should set the default title for null input', () => {
      const title = null;
      setTitle(title);
      expect(document.title).toBe('MegaMart - Your One-Stop Shop');
    });

    test('should set the default title for undefined input', () => {
      const title = undefined;
      setTitle(title);
      expect(document.title).toBe('MegaMart - Your One-Stop Shop');
    });

    test('should set the document title correctly for a valid title with special characters', () => {
      const title = 'Best Deals @MegaMart!';
      setTitle(title);
      expect(document.title).toBe('Best Deals @MegaMart! - MegaMart');
    });

    test.each([
      [null],
      [undefined],
      [''],
      ['     ']
    ])('should set the default title for invalid input: %s', (input) => {
      setTitle(input);
      expect(document.title).toBe('MegaMart - Your One-Stop Shop');
    });
  });
});