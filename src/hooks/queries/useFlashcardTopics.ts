import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as flashcardTopicService from '../../services/flashcardTopicService';
import type { Pageable, CreateFlashcardTopicRequest, UpdateFlashcardTopicRequest } from '../../types/api/flashcardTopic.api';

export const flashcardTopicKeys = {
  all: ['flashcards'] as const,
  metrics: () => [...flashcardTopicKeys.all, 'metrics'] as const,
  topics: () => [...flashcardTopicKeys.all, 'topics'] as const,
  topicList: (params: any) => [...flashcardTopicKeys.topics(), params] as const,
  topicDetail: (topicId: string) => [...flashcardTopicKeys.topics(), topicId] as const,

  // Learner keys
  learner: ['learner-flashcards'] as const,
  learnerMetrics: () => [...flashcardTopicKeys.learner, 'metrics'] as const,
  learnerTopics: () => [...flashcardTopicKeys.learner, 'topics'] as const,
  learnerTopicList: (params: any) => [...flashcardTopicKeys.learnerTopics(), params] as const,
  learnerTopicDetail: (topicId: string) => [...flashcardTopicKeys.learnerTopics(), topicId] as const,
};

export const useGetFlashcardMetricsQuery = () => {
  return useQuery({
    queryKey: flashcardTopicKeys.metrics(),
    queryFn: flashcardTopicService.getFlashcardMetrics,
  });
};

export const useGetFlashcardTopicsQuery = (params: Pageable & { search?: string; status?: string }) => {
  return useQuery({
    queryKey: flashcardTopicKeys.topicList(params),
    queryFn: () => flashcardTopicService.getFlashcardTopics(params),
  });
};

export const useGetFlashcardTopicByIdQuery = (topicId: string) => {
  return useQuery({
    queryKey: flashcardTopicKeys.topicDetail(topicId),
    queryFn: () => flashcardTopicService.getFlashcardTopicById(topicId),
    enabled: !!topicId,
  });
};

export const useCreateFlashcardTopicMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateFlashcardTopicRequest) => flashcardTopicService.createFlashcardTopic(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: flashcardTopicKeys.topics() });
      queryClient.invalidateQueries({ queryKey: flashcardTopicKeys.metrics() });
    },
  });
};

export const useUpdateFlashcardTopicMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ topicId, payload }: { topicId: string; payload: UpdateFlashcardTopicRequest }) =>
      flashcardTopicService.updateFlashcardTopic(topicId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: flashcardTopicKeys.topics() });
      queryClient.invalidateQueries({ queryKey: flashcardTopicKeys.topicDetail(variables.topicId) });
      queryClient.invalidateQueries({ queryKey: flashcardTopicKeys.metrics() });
    },
  });
};

export const useDeleteFlashcardTopicMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (topicId: string) => flashcardTopicService.deleteFlashcardTopic(topicId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: flashcardTopicKeys.topics() });
      queryClient.invalidateQueries({ queryKey: flashcardTopicKeys.metrics() });
    },
  });
};

// --- Learner Hooks ---

export const useGetLearnerFlashcardMetricsQuery = () => {
  return useQuery({
    queryKey: flashcardTopicKeys.learnerMetrics(),
    queryFn: flashcardTopicService.getLearnerFlashcardMetrics,
  });
};

export const useGetLearnerFlashcardTopicsQuery = (params: Pageable & { search?: string }) => {
  return useQuery({
    queryKey: flashcardTopicKeys.learnerTopicList(params),
    queryFn: () => flashcardTopicService.getLearnerFlashcardTopics(params),
  });
};

export const useGetLearnerFlashcardTopicByIdQuery = (topicId: string) => {
  return useQuery({
    queryKey: flashcardTopicKeys.learnerTopicDetail(topicId),
    queryFn: () => flashcardTopicService.getLearnerFlashcardTopicById(topicId),
    enabled: !!topicId,
  });
};
