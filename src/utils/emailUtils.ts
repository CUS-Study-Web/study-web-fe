/**
 * Validates an email address according to standard rules.
 * @param email The email address to validate
 * @returns true if valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  if (!email || email.length > 254) return false;

  const parts = email.split('@');
  if (parts.length !== 2) return false;

  const [localPart, domain] = parts;

  // Local part validation
  if (localPart.length === 0 || localPart.length > 64) return false;
  if (localPart.startsWith('.') || localPart.endsWith('.')) return false;
  if (localPart.includes('..')) return false;

  // Standard regex for local part characters
  const localPartRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
  if (!localPartRegex.test(localPart)) return false;

  // Domain validation
  if (domain.length === 0 || domain.length > 255) return false;
  if (domain.startsWith('-') || domain.endsWith('-')) return false;
  if (domain.includes('..')) return false;

  // Domain must have at least one dot for a valid TLD
  if (!domain.includes('.')) return false;

  // Standard regex for domain characters
  const domainRegex = /^[a-zA-Z0-9.-]+$/;
  if (!domainRegex.test(domain)) return false;

  return true;
};

/**
 * Sanitizes an email address to prevent duplicate registrations using aliases.
 * Specifically handles Gmail addresses by removing dots and aliases (+).
 * @param email The email address to sanitize
 * @returns The sanitized email address
 */
export const sanitizeEmail = (email: string): string => {
  let sanitized = email.trim().toLowerCase();

  if (sanitized.endsWith('@gmail.com')) {
    const parts = sanitized.split('@');
    if (parts.length === 2) {
      let localPart = parts[0];
      
      // Remove everything after '+'
      const plusIndex = localPart.indexOf('+');
      if (plusIndex !== -1) {
        localPart = localPart.substring(0, plusIndex);
      }
      
      // Remove all dots
      localPart = localPart.replace(/\./g, '');
      
      sanitized = `${localPart}@${parts[1]}`;
    }
  }

  return sanitized;
};
