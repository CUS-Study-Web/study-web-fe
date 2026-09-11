import apiClient from './apiClient';
import type { Pageable, SuccessResponse } from '../types/api/flashcardTopic.api';
import type {
  CreateFlashcardRequest,
  UpdateFlashcardRequest,
  SingleResponseFlashcardResponse,
  PageResponseFlashcardResponse,
  PageResponseLearnerFlashcardItemResponse,
  SingleResponseListLearnerFlashcardItemResponse,
  UpdateLearnerProgressRequest,
  SingleResponseLearnerCardProgressResponse,
} from '../types/api/flashcard.api';

// --- Assistant / Admin Endpoints ---

export const getFlashcardsByTopic = async (
  topicId: string,
  params: Pageable & { search?: string }
): Promise<PageResponseFlashcardResponse> => {
  const { data } = await apiClient.get<PageResponseFlashcardResponse>(`/api/flashcards/topics/${topicId}/cards`, { params });
  return data;
};

export const createFlashcard = async (
  topicId: string,
  payload: CreateFlashcardRequest
): Promise<SingleResponseFlashcardResponse> => {
  const { data } = await apiClient.post<SingleResponseFlashcardResponse>(`/api/flashcards/topics/${topicId}/cards`, payload);
  return data;
};

export const getFlashcardById = async (
  topicId: string,
  cardId: string
): Promise<SingleResponseFlashcardResponse> => {
  const { data } = await apiClient.get<SingleResponseFlashcardResponse>(`/api/flashcards/topics/${topicId}/cards/${cardId}`);
  return data;
};

export const updateFlashcard = async (
  topicId: string,
  cardId: string,
  payload: UpdateFlashcardRequest
): Promise<SingleResponseFlashcardResponse> => {
  const { data } = await apiClient.put<SingleResponseFlashcardResponse>(`/api/flashcards/topics/${topicId}/cards/${cardId}`, payload);
  return data;
};

export const deleteFlashcard = async (
  topicId: string,
  cardId: string
): Promise<SuccessResponse> => {
  const { data } = await apiClient.delete<SuccessResponse>(`/api/flashcards/topics/${topicId}/cards/${cardId}`);
  return data;
};

// --- Learner Endpoints ---

export const getLearnerFlashcardWords = async (
  topicId: string,
  params: Pageable & { search?: string; status?: 'ALL' | 'REMEMBERED' | 'NOT_REMEMBERED' | 'NOT_STUDIED' }
): Promise<PageResponseLearnerFlashcardItemResponse> => {
  const { data } = await apiClient.get<PageResponseLearnerFlashcardItemResponse>(`/api/learner/flashcards/topics/${topicId}/words`, { params });
  return data;
};

export const getLearnerFlashcardsStudy = async (
  topicId: string
): Promise<SingleResponseListLearnerFlashcardItemResponse> => {
  const { data } = await apiClient.get<SingleResponseListLearnerFlashcardItemResponse>(`/api/learner/flashcards/topics/${topicId}/study`);
  return data;
};

export const updateLearnerFlashcardProgress = async (
  topicId: string,
  cardId: string,
  payload: UpdateLearnerProgressRequest
): Promise<SingleResponseLearnerCardProgressResponse> => {
  const { data } = await apiClient.post<SingleResponseLearnerCardProgressResponse>(
    `/api/learner/flashcards/topics/${topicId}/cards/${cardId}/progress`,
    payload
  );
  return data;
};
