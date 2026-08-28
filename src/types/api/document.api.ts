import type { BadgeResponse } from './badge.api';
import type { PageResponse, SingleResponse } from './common.api';

export type DocType = 'THEORY' | 'EXERCISE';
export type FileType = 'PDF' | 'DOCX' | 'XLSX' | 'DOC' | 'XLS' | 'PPTX' | 'PPT';
export type AccessTier = 'PUBLIC' | 'VIP';

export interface DocumentResponse {
  id: string;
  title: string;
  docType: DocType;
  fileType: FileType;
  fileUrl: string;
  numPages: number;
  description: string;
  downloadCount: number;
  youtubeUrl: string | null;
  accessTier: AccessTier;
  badges: BadgeResponse[];
  createdAt: string;
  updatedAt: string;
}

export interface DocumentDownloadResponse {
  id: string;
  title: string;
  downloadUrl: string;
  fileType: FileType;
  downloadCount: number;
}

// Responses wrappers
export type PageResponseDocumentResponse = PageResponse<DocumentResponse>;
export type SingleResponseDocumentResponse = SingleResponse<DocumentResponse>;
export type SingleResponseDocumentDownloadResponse = SingleResponse<DocumentDownloadResponse>;

// Request types for reference (not strictly used since we send FormData, but good for typing params)
export interface CreateDocumentRequest {
  file: File;
  title: string;
  docType?: DocType;
  fileType?: FileType;
  numPages?: number;
  description?: string;
  youtubeUrl?: string;
  accessTier?: AccessTier;
  badgeIds?: string[];
}

export interface UpdateDocumentRequest {
  file?: File;
  title?: string;
  docType?: DocType;
  fileType?: FileType;
  numPages?: number;
  description?: string;
  youtubeUrl?: string;
  accessTier?: AccessTier;
  badgeIds?: string[];
}
