import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { documentService } from '../../services/documentService';
import type { DocType, AccessTier } from '../../types/api/document.api';

export const documentKeys = {
  all: ['documents'] as const,
  lists: () => [...documentKeys.all, 'list'] as const,
  list: (params: object) => [...documentKeys.lists(), params] as const,
  details: () => [...documentKeys.all, 'detail'] as const,
  detail: (id: string) => [...documentKeys.details(), id] as const,
};

export const useGetDocumentsQuery = (params: {
  page: number;
  size: number;
  sort?: string[];
  docType?: DocType;
  accessTier?: AccessTier;
  badgeId?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: documentKeys.list(params),
    queryFn: () => documentService.getDocuments(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useGetInfiniteDocumentsQuery = (params: {
  size: number;
  sort?: string[];
  docType?: DocType;
  accessTier?: AccessTier;
  badgeId?: string;
  search?: string;
}) => {
  return useInfiniteQuery({
    queryKey: documentKeys.list({ ...params, infinite: true }),
    queryFn: ({ pageParam = 0 }) => 
      documentService.getDocuments({ ...params, page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.paging;
      return page + 1 < totalPages ? page + 1 : undefined;
    },
  });
};

export const useGetDocumentDetailQuery = (id: string) => {
  return useQuery({
    queryKey: documentKeys.detail(id),
    queryFn: () => documentService.getDocumentById(id),
    enabled: !!id,
  });
};

export const useCreateDocumentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: documentService.createDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentKeys.lists() });
    },
  });
};

export const useUpdateDocumentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) => 
      documentService.updateDocument(id, formData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: documentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: documentKeys.detail(variables.id) });
    },
  });
};

export const useDeleteDocumentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: documentService.deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentKeys.lists() });
    },
  });
};

export const useDownloadDocumentMutation = () => {
  return useMutation({
    mutationFn: documentService.downloadDocument,
  });
};
