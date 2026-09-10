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

export interface CreateFlashcardRequest {
  word: string;
  meaning: string;
  pronunciation?: string;
  partOfSpeech?: string;
}

export interface UpdateFlashcardRequest {
  word?: string;
  meaning?: string;
  pronunciation?: string;
  partOfSpeech?: string;
}

export interface UpdateLearnerProgressRequest {
  status: 'REMEMBERED' | 'NOT_REMEMBERED' | 'NOT_STUDIED';
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

export interface FlashcardResponse {
  id: string;
  topicId: string;
  word: string;
  meaning: string;
  pronunciation: string;
  partOfSpeech: string;
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

export interface LearnerFlashcardItemResponse {
  id: string;
  topicId: string;
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  meaning: string;
  status: 'REMEMBERED' | 'NOT_REMEMBERED' | 'NOT_STUDIED';
}

export interface LearnerCardProgressResponse {
  cardId: string;
  topicId: string;
  status: 'REMEMBERED' | 'NOT_REMEMBERED' | 'NOT_STUDIED';
  topicLearnedWords: number;
  topicTotalWords: number;
  topicProgressPercent: number;
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

export interface SingleResponseFlashcardResponse {
  statusCode: number;
  message: string;
  data: FlashcardResponse;
}

export interface PageResponseFlashcardResponse {
  statusCode: number;
  message: string;
  data: FlashcardResponse[];
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

export interface PageResponseLearnerFlashcardItemResponse {
  statusCode: number;
  message: string;
  data: LearnerFlashcardItemResponse[];
  paging: PagingInfo;
}

export interface SingleResponseListLearnerFlashcardItemResponse {
  statusCode: number;
  message: string;
  data: LearnerFlashcardItemResponse[];
}

export interface SingleResponseLearnerCardProgressResponse {
  statusCode: number;
  message: string;
  data: LearnerCardProgressResponse;
}

export interface SingleResponseLearnerFlashcardMetricsResponse {
  statusCode: number;
  message: string;
  data: LearnerFlashcardMetricsResponse;
}
