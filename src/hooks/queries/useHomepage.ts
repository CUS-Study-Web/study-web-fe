import { useQuery } from '@tanstack/react-query';
import { homepageService } from '../../services/homepageService';

export const homepageKeys = {
  all: ['homepage'] as const,
  content: () => [...homepageKeys.all, 'content'] as const,
  footer: () => [...homepageKeys.all, 'footer'] as const,
};

export const useGetPublicHomepageQuery = () => {
  return useQuery({
    queryKey: homepageKeys.content(),
    queryFn: homepageService.getHomepageContent,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetPublicFooterQuery = () => {
  return useQuery({
    queryKey: homepageKeys.footer(),
    queryFn: homepageService.getFooterContent,
    staleTime: 1000 * 60 * 5,
  });
};
