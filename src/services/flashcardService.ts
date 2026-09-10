import apiClient from './apiClient';
import type {
  Pageable,
  CreateFlashcardTopicRequest,
  UpdateFlashcardTopicRequest,
  CreateFlashcardRequest,
  UpdateFlashcardRequest,
  SingleResponseFlashcardTopicResponse,
  PageResponseFlashcardTopicResponse,
  SingleResponseFlashcardResponse,
  PageResponseFlashcardResponse,
  SingleResponseFlashcardMetricsResponse,
  SuccessResponse,
} from '../types/api/flashcard.api';

// --- Assistant / Admin Endpoints ---

export const getFlashcardMetrics = async (): Promise<SingleResponseFlashcardMetricsResponse> => {
  const { data } = await apiClient.get<SingleResponseFlashcardMetricsResponse>('/api/flashcards/metrics');
  return data;
};

export const getFlashcardTopics = async (
  params: Pageable & { search?: string; status?: string }
): Promise<PageResponseFlashcardTopicResponse> => {
  const { data } = await apiClient.get<PageResponseFlashcardTopicResponse>('/api/flashcards/topics', { params });
  return data;
};

export const createFlashcardTopic = async (
  payload: CreateFlashcardTopicRequest
): Promise<SingleResponseFlashcardTopicResponse> => {
  const { data } = await apiClient.post<SingleResponseFlashcardTopicResponse>('/api/flashcards/topics', payload);
  return data;
};

export const getFlashcardTopicById = async (
  topicId: string
): Promise<SingleResponseFlashcardTopicResponse> => {
  const { data } = await apiClient.get<SingleResponseFlashcardTopicResponse>(`/api/flashcards/topics/${topicId}`);
  return data;
};

export const updateFlashcardTopic = async (
  topicId: string,
  payload: UpdateFlashcardTopicRequest
): Promise<SingleResponseFlashcardTopicResponse> => {
  const { data } = await apiClient.put<SingleResponseFlashcardTopicResponse>(`/api/flashcards/topics/${topicId}`, payload);
  return data;
};

export const deleteFlashcardTopic = async (topicId: string): Promise<SuccessResponse> => {
  const { data } = await apiClient.delete<SuccessResponse>(`/api/flashcards/topics/${topicId}`);
  return data;
};

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
