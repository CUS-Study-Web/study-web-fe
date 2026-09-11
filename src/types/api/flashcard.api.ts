import type { PagingInfo } from './flashcardTopic.api';

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
