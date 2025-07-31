// src/utils/setTitle.test.ts

import { setTitle } from './setTitle';

describe('src/utils/setTitle.js Tests', () => {
  // Reset document.title before each test
  beforeEach(() => {
    document.title = '';
  });

  describe('setTitle', () => {
    test('should set the document title correctly for valid input', () => {
      const title = 'Home';
      setTitle(title);
      expect(document.title).toBe('Home - MegaMart');
    });

    test('should trim whitespace from title before setting', () => {
      const title = '   Products   ';
      setTitle(title);
      expect(document.title).toBe('Products - MegaMart');
    });

    test('should set default title for empty string', () => {
      setTitle('');
      expect(document.title).toBe('MegaMart - Your One-Stop Shop');
    });

    test('should set default title for null input', () => {
      setTitle(null);
      expect(document.title).toBe('MegaMart - Your One-Stop Shop');
    });

    test('should set default title for undefined input', () => {
      setTitle(undefined);
      expect(document.title).toBe('MegaMart - Your One-Stop Shop');
    });

    test('should set default title for non-string input', () => {
      setTitle(123 as any);
      expect(document.title).toBe('MegaMart - Your One-Stop Shop');
      
      setTitle(true as any);
      expect(document.title).toBe('MegaMart - Your One-Stop Shop');

      setTitle([] as any);
      expect(document.title).toBe('MegaMart - Your One-Stop Shop');

      setTitle({} as any);
      expect(document.title).toBe('MegaMart - Your One-Stop Shop');
    });

    test('should handle titles with only whitespace', () => {
      setTitle('     ');
      expect(document.title).toBe('MegaMart - Your One-Stop Shop');
    });

    // Parameterized tests for multiple valid titles
    test.each([
      ['About', 'About - MegaMart'],
      ['Contact Us', 'Contact Us - MegaMart'],
      ['Special Offers', 'Special Offers - MegaMart'],
    ])('should set the document title to "%s" correctly', (input, expected) => {
      setTitle(input);
      expect(document.title).toBe(expected);
    });
  });
});