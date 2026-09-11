import apiClient from './apiClient';
import type {
  Pageable,
  CreateFlashcardTopicRequest,
  UpdateFlashcardTopicRequest,
  SingleResponseFlashcardTopicResponse,
  PageResponseFlashcardTopicResponse,
  SingleResponseFlashcardMetricsResponse,
  SuccessResponse,
  PageResponseLearnerFlashcardTopicResponse,
  SingleResponseLearnerTopicDetailResponse,
  SingleResponseLearnerFlashcardMetricsResponse,
} from '../types/api/flashcardTopic.api';

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

// --- Learner Endpoints ---

export const getLearnerFlashcardMetrics = async (): Promise<SingleResponseLearnerFlashcardMetricsResponse> => {
  const { data } = await apiClient.get<SingleResponseLearnerFlashcardMetricsResponse>('/api/learner/flashcards/metrics');
  return data;
};

export const getLearnerFlashcardTopics = async (
  params: Pageable & { search?: string }
): Promise<PageResponseLearnerFlashcardTopicResponse> => {
  const { data } = await apiClient.get<PageResponseLearnerFlashcardTopicResponse>('/api/learner/flashcards/topics', { params });
  return data;
};

export const getLearnerFlashcardTopicById = async (
  topicId: string
): Promise<SingleResponseLearnerTopicDetailResponse> => {
  const { data } = await apiClient.get<SingleResponseLearnerTopicDetailResponse>(`/api/learner/flashcards/topics/${topicId}`);
  return data;
};
