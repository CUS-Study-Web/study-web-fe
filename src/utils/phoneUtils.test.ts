import { describe, it, expect } from 'vitest';
import { validatePhone } from './phoneUtils';

describe('phoneUtils', () => {
  describe('validatePhone', () => {
    it('should return true for valid Vietnamese phone numbers starting with 0', () => {
      expect(validatePhone('0912345678')).toBe(true);
      expect(validatePhone('0387654321')).toBe(true);
      expect(validatePhone('0701234567')).toBe(true);
      expect(validatePhone('0898765432')).toBe(true);
      expect(validatePhone('0561234567')).toBe(true);
    });

    it('should return true for valid Vietnamese phone numbers with +84 prefix', () => {
      expect(validatePhone('+84912345678')).toBe(true);
      expect(validatePhone('+84387654321')).toBe(true);
      expect(validatePhone('+84701234567')).toBe(true);
      expect(validatePhone('+84898765432')).toBe(true);
      expect(validatePhone('+84561234567')).toBe(true);
    });

    it('should handle numbers with spaces correctly', () => {
      expect(validatePhone('0912 345 678')).toBe(true);
      expect(validatePhone(' 0912345678 ')).toBe(true);
      expect(validatePhone('+84 912 345 678')).toBe(true);
    });

    it('should return false for empty or falsy values', () => {
      expect(validatePhone('')).toBe(false);
      // @ts-expect-error testing invalid type
      expect(validatePhone(null)).toBe(false);
      // @ts-expect-error testing invalid type
      expect(validatePhone(undefined)).toBe(false);
    });

    it('should return false for invalid phone prefixes', () => {
      expect(validatePhone('0112345678')).toBe(false);
      expect(validatePhone('0212345678')).toBe(false);
      expect(validatePhone('0412345678')).toBe(false);
      expect(validatePhone('0612345678')).toBe(false);
      expect(validatePhone('+84212345678')).toBe(false);
    });

    it('should return false for numbers with incorrect length', () => {
      expect(validatePhone('091234567')).toBe(false); // 9 digits
      expect(validatePhone('09123456789')).toBe(false); // 11 digits
      expect(validatePhone('+8491234567')).toBe(false);
      expect(validatePhone('+849123456789')).toBe(false);
    });

    it('should return false for strings with non-numeric characters', () => {
      expect(validatePhone('091234567a')).toBe(false);
      expect(validatePhone('abcdefghij')).toBe(false);
      expect(validatePhone('0912-345-678')).toBe(false);
    });
  });
});
