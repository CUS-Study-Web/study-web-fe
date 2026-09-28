export interface Pageable {
  page: number;
  size: number;
  sort?: string[];
}

export interface PagingInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CreateFlashcardTopicRequest {
  title: string;
  description?: string;
  status?: 'DRAFT' | 'PUBLISH' | 'DEVELOPING';
}

export interface UpdateFlashcardTopicRequest {
  title?: string;
  description?: string;
  status?: 'DRAFT' | 'PUBLISH' | 'DEVELOPING';
}

export interface FlashcardTopicResponse {
  id: string;
  title: string;
  numWords: number;
  description: string;
  status: 'DRAFT' | 'PUBLISH' | 'DEVELOPING';
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface LearnerFlashcardTopicResponse {
  id: string;
  title: string;
  description: string;
  numWords: number;
  learnedWords: number;
  progressPercent: number;
  isCompleted: boolean;
}

export interface LearnerTopicDetailResponse {
  id: string;
  title: string;
  description: string;
  totalWords: number;
  rememberedWords: number;
  studyWords: number;
  progressPercent: number;
}

export interface FlashcardMetricsResponse {
  totalTopics: number;
  totalWords: number;
  activeTopics: number;
}

export interface LearnerFlashcardMetricsResponse {
  totalTopics: number;
  totalWords: number;
  totalRememberedWords: number;
}

export interface SingleResponseFlashcardTopicResponse {
  statusCode: number;
  message: string;
  data: FlashcardTopicResponse;
}

export interface PageResponseFlashcardTopicResponse {
  statusCode: number;
  message: string;
  data: FlashcardTopicResponse[];
  paging: PagingInfo;
}

export interface SingleResponseFlashcardMetricsResponse {
  statusCode: number;
  message: string;
  data: FlashcardMetricsResponse;
}

export interface SuccessResponse {
  statusCode: number;
  message: string;
}

export interface PageResponseLearnerFlashcardTopicResponse {
  statusCode: number;
  message: string;
  data: LearnerFlashcardTopicResponse[];
  paging: PagingInfo;
}

export interface SingleResponseLearnerTopicDetailResponse {
  statusCode: number;
  message: string;
  data: LearnerTopicDetailResponse;
}

export interface SingleResponseLearnerFlashcardMetricsResponse {
  statusCode: number;
  message: string;
  data: LearnerFlashcardMetricsResponse;
}
