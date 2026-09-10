import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as flashcardService from '../../services/flashcardService';
import type { Pageable, CreateFlashcardTopicRequest, UpdateFlashcardTopicRequest, CreateFlashcardRequest, UpdateFlashcardRequest } from '../../types/api/flashcard.api';

export const flashcardKeys = {
  all: ['flashcards'] as const,
  metrics: () => [...flashcardKeys.all, 'metrics'] as const,
  topics: () => [...flashcardKeys.all, 'topics'] as const,
  topicList: (params: any) => [...flashcardKeys.topics(), params] as const,
  topicDetail: (topicId: string) => [...flashcardKeys.topics(), topicId] as const,
  cards: (topicId: string) => [...flashcardKeys.topicDetail(topicId), 'cards'] as const,
  cardList: (topicId: string, params: any) => [...flashcardKeys.cards(topicId), params] as const,
  cardDetail: (topicId: string, cardId: string) => [...flashcardKeys.cards(topicId), cardId] as const,
};

export const useGetFlashcardMetricsQuery = () => {
  return useQuery({
    queryKey: flashcardKeys.metrics(),
    queryFn: flashcardService.getFlashcardMetrics,
  });
};

export const useGetFlashcardTopicsQuery = (params: Pageable & { search?: string; status?: string }) => {
  return useQuery({
    queryKey: flashcardKeys.topicList(params),
    queryFn: () => flashcardService.getFlashcardTopics(params),
  });
};

export const useGetFlashcardTopicByIdQuery = (topicId: string) => {
  return useQuery({
    queryKey: flashcardKeys.topicDetail(topicId),
    queryFn: () => flashcardService.getFlashcardTopicById(topicId),
    enabled: !!topicId,
  });
};

export const useCreateFlashcardTopicMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateFlashcardTopicRequest) => flashcardService.createFlashcardTopic(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: flashcardKeys.topics() });
      queryClient.invalidateQueries({ queryKey: flashcardKeys.metrics() });
    },
  });
};

export const useUpdateFlashcardTopicMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ topicId, payload }: { topicId: string; payload: UpdateFlashcardTopicRequest }) =>
      flashcardService.updateFlashcardTopic(topicId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: flashcardKeys.topics() });
      queryClient.invalidateQueries({ queryKey: flashcardKeys.topicDetail(variables.topicId) });
      queryClient.invalidateQueries({ queryKey: flashcardKeys.metrics() });
    },
  });
};

export const useDeleteFlashcardTopicMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (topicId: string) => flashcardService.deleteFlashcardTopic(topicId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: flashcardKeys.topics() });
      queryClient.invalidateQueries({ queryKey: flashcardKeys.metrics() });
    },
  });
};

export const useGetFlashcardsByTopicQuery = (topicId: string, params: Pageable & { search?: string }) => {
  return useQuery({
    queryKey: flashcardKeys.cardList(topicId, params),
    queryFn: () => flashcardService.getFlashcardsByTopic(topicId, params),
    enabled: !!topicId,
  });
};

export const useCreateFlashcardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ topicId, payload }: { topicId: string; payload: CreateFlashcardRequest }) =>
      flashcardService.createFlashcard(topicId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: flashcardKeys.cards(variables.topicId) });
      queryClient.invalidateQueries({ queryKey: flashcardKeys.topicDetail(variables.topicId) });
      queryClient.invalidateQueries({ queryKey: flashcardKeys.topics() }); // For numWords update
      queryClient.invalidateQueries({ queryKey: flashcardKeys.metrics() });
    },
  });
};

export const useUpdateFlashcardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ topicId, cardId, payload }: { topicId: string; cardId: string; payload: UpdateFlashcardRequest }) =>
      flashcardService.updateFlashcard(topicId, cardId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: flashcardKeys.cards(variables.topicId) });
      queryClient.invalidateQueries({ queryKey: flashcardKeys.cardDetail(variables.topicId, variables.cardId) });
    },
  });
};

export const useDeleteFlashcardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ topicId, cardId }: { topicId: string; cardId: string }) =>
      flashcardService.deleteFlashcard(topicId, cardId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: flashcardKeys.cards(variables.topicId) });
      queryClient.invalidateQueries({ queryKey: flashcardKeys.topicDetail(variables.topicId) });
      queryClient.invalidateQueries({ queryKey: flashcardKeys.topics() }); // For numWords update
      queryClient.invalidateQueries({ queryKey: flashcardKeys.metrics() });
    },
  });
};
