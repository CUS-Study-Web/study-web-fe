export const isValidUrl = (url: string): boolean => {
  if (!url) return true; // empty is allowed as optional
  if (/\s/.test(url)) return false; // no spaces allowed
  if (!/^[\x21-\x7E]+$/.test(url)) return false; // only printable ASCII allowed (no spaces)
  try {
    const parsed = new URL(url);
    if (!parsed.protocol) return false;
    // Must have a specific address after the domain (not just a root path without search params)
    if (parsed.pathname === '/' && !parsed.search && !parsed.hash) return false;
    return true;
  } catch {
    return false;
  }
};
