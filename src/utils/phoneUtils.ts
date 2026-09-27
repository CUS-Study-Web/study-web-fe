/**
 * Validates a Vietnamese phone number.
 * Accepts formats: 0912345678 or +84912345678
 * @param phone The phone number to validate
 * @returns true if valid, false otherwise
 */
export const validatePhone = (phone: string): boolean => {
  if (!phone) return false;
  
  // Regex for Vietnamese phone numbers
  // Matches: 03, 05, 07, 08, 09 or +843, +845, +847, +848, +849 followed by 8 digits
  const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
  
  // Remove all spaces before testing
  const cleanedPhone = phone.replace(/\s+/g, '');
  
  return phoneRegex.test(cleanedPhone);
};
