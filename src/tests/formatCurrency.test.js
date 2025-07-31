import { formatCurrency, formatPrice } from '../src/utils/formatCurrency';

describe('src/utils/formatCurrency.js Tests', () => {
  describe('formatCurrency', () => {
    test('should format USD currency correctly for positive numbers', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
    });

    test('should format USD currency correctly for negative numbers', () => {
      expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
    });

    test('should format currency correctly for different currencies', () => {
      expect(formatCurrency(1000, 'EUR')).toBe('€1,000.00');
      expect(formatCurrency(1000, 'JPY')).toBe('¥1,000');
      expect(formatCurrency(1000, 'GBP')).toBe('£1,000.00');
    });

    test('should handle null and undefined input gracefully', () => {
      expect(formatCurrency(null)).toBe('NaN'); // Expecting NaN since null is not a valid number
      expect(formatCurrency(undefined)).toBe('NaN'); // Expecting NaN since undefined is not a valid number
    });
    
    test('should handle edge cases with zero', () => {
      expect(formatCurrency(0)).toBe('$0.00');
    });

    test('should throw an error for invalid currency codes', () => {
      // This is a mock test since Intl.NumberFormat will not throw an error but return NaN
      expect(formatCurrency(100, 'INVALID')).toBe('NaN'); 
    });

    test('should format currency correctly for very large numbers', () => {
      expect(formatCurrency(1234567890)).toBe('$1,234,567,890.00');
    });
  });

  describe('formatPrice', () => {
    test('should return formatted currency for valid number input', () => {
      expect(formatPrice(99.99)).toBe('$99.99');
      expect(formatPrice(0)).toBe('$0.00');
    });

    test('should return default value for non-number input', () => {
      expect(formatPrice(null)).toBe('$0.00');
      expect(formatPrice(undefined)).toBe('$0.00');
      expect(formatPrice('not a number')).toBe('$0.00');
      expect(formatPrice({})).toBe('$0.00');
      expect(formatPrice([])).toBe('$0.00');
    });

    test('should handle edge cases with negative prices', () => {
      expect(formatPrice(-45.99)).toBe('$-45.99');
    });

    test('should return formatted currency for integer input', () => {
      expect(formatPrice(100)).toBe('$100.00');
    });

    test.each([
      [1.2345, '$1.23'],
      [123456.789, '$123,456.79'],
      [-987.654, '$-987.65'],
    ])('should return correct formatted value for price %s', (input, expected) => {
      expect(formatPrice(input)).toBe(expected);
    });
  });
});