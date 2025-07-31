import { formatCurrency, formatPrice } from '../src/utils/formatCurrency';

describe('src/utils/formatCurrency.js Tests', () => {
  // Test for formatCurrency function
  describe('formatCurrency', () => {
    test('should format positive amount in USD correctly', () => {
      const result = formatCurrency(1234.56);
      expect(result).toBe('$1,234.56');
    });

    test('should format negative amount in USD correctly', () => {
      const result = formatCurrency(-1234.56);
      expect(result).toBe('-$1,234.56');
    });

    test('should format amount in specified currency', () => {
      const result = formatCurrency(1234.56, 'EUR');
      expect(result).toBe('€1,234.56');
    });

    test('should format zero amount in USD correctly', () => {
      const result = formatCurrency(0);
      expect(result).toBe('$0.00');
    });

    test('should handle invalid currency gracefully', () => {
      const result = formatCurrency(1234.56, 'INVALID');
      expect(result).toBe('$1,234.56'); // Fallback to default formatting
    });
  });

  // Test for formatPrice function
  describe('formatPrice', () => {
    test('should return formatted price for valid number input', () => {
      const result = formatPrice(1500);
      expect(result).toBe('$1,500.00');
    });

    test('should return formatted price for zero input', () => {
      const result = formatPrice(0);
      expect(result).toBe('$0.00');
    });

    test('should handle negative price correctly', () => {
      const result = formatPrice(-250);
      expect(result).toBe('-$250.00');
    });

    test('should return $0.00 for non-number input (string)', () => {
      const result = formatPrice('not a number');
      expect(result).toBe('$0.00');
    });

    test('should return $0.00 for non-number input (null)', () => {
      const result = formatPrice(null);
      expect(result).toBe('$0.00');
    });

    test('should return $0.00 for non-number input (undefined)', () => {
      const result = formatPrice(undefined);
      expect(result).toBe('$0.00');
    });

    test('should return $0.00 for non-number input (object)', () => {
      const result = formatPrice({});
      expect(result).toBe('$0.00');
    });

    test('should return $0.00 for non-number input (array)', () => {
      const result = formatPrice([]);
      expect(result).toBe('$0.00');
    });
  });
});