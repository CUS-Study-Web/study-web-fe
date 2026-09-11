import { useQuery, useMutation, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import * as flashcardService from '../../services/flashcardService';
import { flashcardTopicKeys } from './useFlashcardTopics';
import type { Pageable } from '../../types/api/flashcardTopic.api';
import type { CreateFlashcardRequest, UpdateFlashcardRequest, UpdateLearnerProgressRequest } from '../../types/api/flashcard.api';

export const flashcardKeys = {
  cards: (topicId: string) => [...flashcardTopicKeys.topicDetail(topicId), 'cards'] as const,
  cardList: (topicId: string, params: any) => [...flashcardKeys.cards(topicId), params] as const,
  cardDetail: (topicId: string, cardId: string) => [...flashcardKeys.cards(topicId), cardId] as const,

  // Learner keys
  learnerWords: (topicId: string) => [...flashcardTopicKeys.learnerTopicDetail(topicId), 'words'] as const,
  learnerWordList: (topicId: string, params: any) => [...flashcardKeys.learnerWords(topicId), params] as const,
  learnerStudy: (topicId: string) => [...flashcardTopicKeys.learnerTopicDetail(topicId), 'study'] as const,
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
      queryClient.invalidateQueries({ queryKey: flashcardTopicKeys.topicDetail(variables.topicId) });
      queryClient.invalidateQueries({ queryKey: flashcardTopicKeys.topics() }); // For numWords update
      queryClient.invalidateQueries({ queryKey: flashcardTopicKeys.metrics() });
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
      queryClient.invalidateQueries({ queryKey: flashcardTopicKeys.topicDetail(variables.topicId) });
      queryClient.invalidateQueries({ queryKey: flashcardTopicKeys.topics() }); // For numWords update
      queryClient.invalidateQueries({ queryKey: flashcardTopicKeys.metrics() });
    },
  });
};

// --- Learner Hooks ---

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
      queryClient.invalidateQueries({ queryKey: flashcardTopicKeys.learnerTopicDetail(variables.topicId) });
      queryClient.invalidateQueries({ queryKey: flashcardKeys.learnerWords(variables.topicId) });
      queryClient.invalidateQueries({ queryKey: flashcardKeys.learnerStudy(variables.topicId) });
      queryClient.invalidateQueries({ queryKey: flashcardTopicKeys.learnerTopics() });
      queryClient.invalidateQueries({ queryKey: flashcardTopicKeys.learnerMetrics() });
    },
  });
};
