export const websiteKeys = {
  all: ['website-management'] as const,
  homepage: () => [...websiteKeys.all, 'homepage'] as const,
  footer: () => [...websiteKeys.all, 'footer'] as const,
};
