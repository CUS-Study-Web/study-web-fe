import apiClient from './apiClient';
import type { 
  PageResponseDocumentResponse, 
  SingleResponseDocumentResponse, 
  SingleResponseDocumentDownloadResponse,
  PageResponseGuestDocumentResponse,
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
    const query = new URLSearchParams();
    if (params.page !== undefined) query.append('page', params.page.toString());
    if (params.size !== undefined) query.append('size', params.size.toString());
    if (params.docType) query.append('docType', params.docType);
    if (params.accessTier) query.append('accessTier', params.accessTier);
    if (params.badgeId) query.append('badgeId', params.badgeId);
    if (params.search) query.append('search', params.search);
    if (params.sort) {
      params.sort.forEach(s => query.append('sort', s));
    }
    const { data } = await apiClient.get<PageResponseDocumentResponse>(`/api/documents?${query.toString()}`);
    return data;
  },

  getDocumentById: async (id: string) => {
    const { data } = await apiClient.get<SingleResponseDocumentResponse>(`/api/documents/${id}`);
    return data;
  },

  createDocument: async (formData: FormData) => {
    const { data } = await apiClient.post<SingleResponseDocumentResponse>('/api/documents', formData, {
      headers: {
        'Content-Type': undefined,
      },
    });
    return data;
  },

  updateDocument: async (id: string, formData: FormData) => {
    const { data } = await apiClient.put<SingleResponseDocumentResponse>(`/api/documents/${id}`, formData, {
      headers: {
        'Content-Type': undefined,
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
  },

  getGuestDocuments: async (params: {
    page: number;
    size: number;
    sort?: string[];
    docType?: DocType;
    badgeId?: string;
    search?: string;
  }) => {
    const query = new URLSearchParams();
    if (params.page !== undefined) query.append('page', params.page.toString());
    if (params.size !== undefined) query.append('size', params.size.toString());
    if (params.docType) query.append('docType', params.docType);
    if (params.badgeId) query.append('badgeId', params.badgeId);
    if (params.search) query.append('search', params.search);
    if (params.sort) {
      params.sort.forEach(s => query.append('sort', s));
    }
    const { data } = await apiClient.get<PageResponseGuestDocumentResponse>(`/api/documents/guest?${query.toString()}`);
    return data;
  }
};
