import { formatCurrency, formatPrice } from '../src/utils/formatCurrency';

describe('src/utils/formatCurrency.js Tests', () => {
  describe('formatCurrency', () => {
    test('should format number as USD currency by default', () => {
      const result = formatCurrency(1234.56);
      expect(result).toBe('$1,234.56');
    });

    test('should format number as specified currency', () => {
      const result = formatCurrency(1234.56, 'EUR');
      expect(result).toBe('€1,234.56');
    });

    test('should handle negative numbers correctly', () => {
      const result = formatCurrency(-1234.56);
      expect(result).toBe('-$1,234.56');
    });

    test('should format zero correctly', () => {
      const result = formatCurrency(0);
      expect(result).toBe('$0.00');
    });

    test('should throw error when currency code is invalid', () => {
      expect(() => formatCurrency(1234.56, 'INVALID')).toThrowError();
    });

    test('should handle edge case of large numbers', () => {
      const result = formatCurrency(1e12);
      expect(result).toBe('$1,000,000,000,000.00');
    });

    test('should return NaN formatted correctly', () => {
      const result = formatCurrency(NaN);
      expect(result).toBe('$NaN');
    });

    test('should return formatted string for different locales', () => {
      const result = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }).format(1234.56);
      expect(formatCurrency(1234.56, 'EUR')).toBe(result);
    });
  });

  describe('formatPrice', () => {
    test('should return formatted currency for valid number input', () => {
      const result = formatPrice(100.25);
      expect(result).toBe('$100.25');
    });

    test('should return $0.00 for non-numeric input', () => {
      expect(formatPrice(null)).toBe('$0.00');
      expect(formatPrice(undefined)).toBe('$0.00');
      expect(formatPrice('not a number')).toBe('$0.00');
      expect(formatPrice([])).toBe('$0.00');
      expect(formatPrice({})).toBe('$0.00');
    });

    test('should handle edge case of negative numbers', () => {
      const result = formatPrice(-100.25);
      expect(result).toBe('$-100.25');
    });

    test('should handle edge case of zero correctly', () => {
      const result = formatPrice(0);
      expect(result).toBe('$0.00');
    });

    test('should return formatted string for large prices', () => {
      const result = formatPrice(1e6);
      expect(result).toBe('$1,000,000.00');
    });
  });
});