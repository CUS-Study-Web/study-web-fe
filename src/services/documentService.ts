import apiClient from './apiClient';
import type { 
  PageResponseDocumentResponse, 
  SingleResponseDocumentResponse, 
  SingleResponseDocumentDownloadResponse,
  DocType,
  AccessTier
} from '../types/api/document.api';
import type { SuccessResponse } from '../types/api/common.api';

export const documentService = {
  getDocuments: async (params: {
    page: number;
    size: number;
    sort?: string[];
    docType?: DocType;
    accessTier?: AccessTier;
    badgeId?: string;
    search?: string;
  }) => {
    // Axios array format serialization is tricky for `sort=field1,asc&sort=field2,desc`.
    // It's safer to pass as query string or URLSearchParams if array fails, but axios handles params: { sort: ['a,asc'] } reasonably.
    const { data } = await apiClient.get<PageResponseDocumentResponse>('/api/documents', { params });
    return data;
  },

  getDocumentById: async (id: string) => {
    const { data } = await apiClient.get<SingleResponseDocumentResponse>(`/api/documents/${id}`);
    return data;
  },

  createDocument: async (formData: FormData) => {
    const { data } = await apiClient.post<SingleResponseDocumentResponse>('/api/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  updateDocument: async (id: string, formData: FormData) => {
    const { data } = await apiClient.put<SingleResponseDocumentResponse>(`/api/documents/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  deleteDocument: async (id: string) => {
    const { data } = await apiClient.delete<SuccessResponse>(`/api/documents/${id}`);
    return data;
  },

  downloadDocument: async (id: string) => {
    const { data } = await apiClient.post<SingleResponseDocumentDownloadResponse>(`/api/documents/${id}/download`);
    return data;
  }
};
