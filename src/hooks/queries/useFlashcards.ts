import { useQuery, useMutation, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import * as flashcardService from '../../services/flashcardService';
import type { Pageable, CreateFlashcardTopicRequest, UpdateFlashcardTopicRequest, CreateFlashcardRequest, UpdateFlashcardRequest, UpdateLearnerProgressRequest } from '../../types/api/flashcard.api';

export const flashcardKeys = {
  all: ['flashcards'] as const,
  metrics: () => [...flashcardKeys.all, 'metrics'] as const,
  topics: () => [...flashcardKeys.all, 'topics'] as const,
  topicList: (params: any) => [...flashcardKeys.topics(), params] as const,
  topicDetail: (topicId: string) => [...flashcardKeys.topics(), topicId] as const,
  cards: (topicId: string) => [...flashcardKeys.topicDetail(topicId), 'cards'] as const,
  cardList: (topicId: string, params: any) => [...flashcardKeys.cards(topicId), params] as const,
  cardDetail: (topicId: string, cardId: string) => [...flashcardKeys.cards(topicId), cardId] as const,

  // Learner keys
  learner: ['learner-flashcards'] as const,
  learnerMetrics: () => [...flashcardKeys.learner, 'metrics'] as const,
  learnerTopics: () => [...flashcardKeys.learner, 'topics'] as const,
  learnerTopicList: (params: any) => [...flashcardKeys.learnerTopics(), params] as const,
  learnerTopicDetail: (topicId: string) => [...flashcardKeys.learnerTopics(), topicId] as const,
  learnerWords: (topicId: string) => [...flashcardKeys.learnerTopicDetail(topicId), 'words'] as const,
  learnerWordList: (topicId: string, params: any) => [...flashcardKeys.learnerWords(topicId), params] as const,
  learnerStudy: (topicId: string) => [...flashcardKeys.learnerTopicDetail(topicId), 'study'] as const,
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

// --- Learner Hooks ---

export const useGetLearnerFlashcardMetricsQuery = () => {
  return useQuery({
    queryKey: flashcardKeys.learnerMetrics(),
    queryFn: flashcardService.getLearnerFlashcardMetrics,
  });
};

export const useGetLearnerFlashcardTopicsQuery = (params: Pageable & { search?: string }) => {
  return useQuery({
    queryKey: flashcardKeys.learnerTopicList(params),
    queryFn: () => flashcardService.getLearnerFlashcardTopics(params),
  });
};

export const useGetLearnerFlashcardTopicByIdQuery = (topicId: string) => {
  return useQuery({
    queryKey: flashcardKeys.learnerTopicDetail(topicId),
    queryFn: () => flashcardService.getLearnerFlashcardTopicById(topicId),
    enabled: !!topicId,
  });
};

export const useGetInfiniteLearnerFlashcardWordsQuery = (
  topicId: string,
  params: Omit<Pageable, 'page'> & { search?: string; status?: 'ALL' | 'REMEMBERED' | 'NOT_REMEMBERED' | 'NOT_STUDIED' }
) => {
  return useInfiniteQuery({
    queryKey: flashcardKeys.learnerWordList(topicId, params),
    queryFn: ({ pageParam = 0 }) =>
      flashcardService.getLearnerFlashcardWords(topicId, { ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.paging.page + 1;
      return nextPage < lastPage.paging.totalPages ? nextPage : undefined;
    },
    initialPageParam: 0,
    enabled: !!topicId,
  });
};

export const useGetLearnerFlashcardsStudyQuery = (topicId: string) => {
  return useQuery({
    queryKey: flashcardKeys.learnerStudy(topicId),
    queryFn: () => flashcardService.getLearnerFlashcardsStudy(topicId),
    enabled: !!topicId,
  });
};

export const useUpdateLearnerFlashcardProgressMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ topicId, cardId, payload }: { topicId: string; cardId: string; payload: UpdateLearnerProgressRequest }) =>
      flashcardService.updateLearnerFlashcardProgress(topicId, cardId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: flashcardKeys.learnerTopicDetail(variables.topicId) });
      queryClient.invalidateQueries({ queryKey: flashcardKeys.learnerWords(variables.topicId) });
      queryClient.invalidateQueries({ queryKey: flashcardKeys.learnerStudy(variables.topicId) });
      queryClient.invalidateQueries({ queryKey: flashcardKeys.learnerTopics() });
      queryClient.invalidateQueries({ queryKey: flashcardKeys.learnerMetrics() });
    },
  });
};
