import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { FlashcardTopicResponse } from '../../types/api/flashcard.api';
import { AssistantSummaryChips, AssistantTopicTable } from '../../components/assistant/flashcard/AssistantFlashcardTable';
import { AssistantCreateTopicPopup } from '../../components/assistant/flashcard/AssistantCreateTopicPopup';
import { AssistantEditTopicPopup, type EditableWord } from '../../components/assistant/flashcard/AssistantEditTopicPopup';
import AssistantConfirmPopup from '../../components/assistant/AssistantConfirmPopup';
import AssistantFeatureInDevPopup from '../../components/assistant/AssistantFeatureInDevPopup';
import AssistantMaterialSortPopup from '../../components/assistant/material/AssistantMaterialSortPopup';
import { useNotification } from '../../components/common/NotificationProvider';
import {
  useGetFlashcardMetricsQuery,
  useGetFlashcardTopicsQuery,
  useCreateFlashcardTopicMutation,
  useUpdateFlashcardTopicMutation,
  useDeleteFlashcardTopicMutation,
  useCreateFlashcardMutation,
  useUpdateFlashcardMutation,
  useDeleteFlashcardMutation
} from '../../hooks/queries/useFlashcards';

export default function AssistantFlashcards() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { showSuccess, showError } = useNotification();

  const [sort, setSort] = useState<string>("createdAt,desc");

  // ─── Queries ────────────────────────────────────────────────────────────────
  const { data: metricsData } = useGetFlashcardMetricsQuery();
  // We fetch a large number for now, or you can implement actual pagination
  const { data: topicsData } = useGetFlashcardTopicsQuery({ page: 0, size: 1000, sort: [sort] });

  // ─── Mutations ──────────────────────────────────────────────────────────────
  const createTopicMut = useCreateFlashcardTopicMutation();
  const updateTopicMut = useUpdateFlashcardTopicMutation();
  const deleteTopicMut = useDeleteFlashcardTopicMutation();

  const createCardMut = useCreateFlashcardMutation();
  const updateCardMut = useUpdateFlashcardMutation();
  const deleteCardMut = useDeleteFlashcardMutation();

  // ─── Page-level state ───────────────────────────────────────────────────────
  const [modal, setModal] = useState<null | 'create' | 'edit'>(() =>
    searchParams.get('create') === '1' ? 'create' : null
  );
  const [openKebab, setOpenKebab] = useState<string | null>(null);
  const [editTopic, setEditTopic] = useState<FlashcardTopicResponse | null>(null);
  const [deleteTopicId, setDeleteTopicId] = useState<string | null>(null);
  const [showDevPopup, setShowDevPopup] = useState(false);

  const topics = topicsData?.data || [];

  // Clear URL param after reading it once
  useEffect(() => {
    if (searchParams.get('create') === '1') {
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const handleOpenEdit = (topic: FlashcardTopicResponse) => {
    setEditTopic(topic);
    setModal('edit');
    setOpenKebab(null);
  };

  const handleDeleteRequest = (id: string) => {
    setDeleteTopicId(id);
    setOpenKebab(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteTopicId !== null) {
      deleteTopicMut.mutate(deleteTopicId, {
        onSuccess: () => {
          showSuccess("Đã xóa chủ đề thành công");
          setDeleteTopicId(null);
        },
        onError: (err: any) => {
          showError(err.message || "Lỗi khi xóa chủ đề");
          setDeleteTopicId(null);
        }
      });
    }
  };

  const handleCreateTopic = (name: string, _fileName: string, status: 'PUBLISH' | 'DRAFT') => {
    createTopicMut.mutate({ title: name, status }, {
      onSuccess: () => {
        showSuccess("Tạo chủ đề thành công");
      },
      onError: (err: any) => {
        showError(err.message || "Lỗi khi tạo chủ đề");
      }
    });
  };

  const handleSaveTopicAndWords = async (words: EditableWord[], status: 'PUBLISH' | 'DRAFT') => {
    if (!editTopic) return;
    const topicId = editTopic.id;

    // 1. Update topic status if changed
    if (status !== editTopic.status) {
      updateTopicMut.mutate({ topicId, payload: { status } });
    }

    // 2. Process words: new, updated, deleted
    let successCount = 0;
    const errors: string[] = [];

    const processPromises = words.map(async (word) => {
      try {
        if (word.isDeleted) {
          if (!word.isNew) {
            await deleteCardMut.mutateAsync({ topicId, cardId: word.id });
            successCount++;
          }
        } else if (word.isNew) {
          if (word.word && word.meaning) {
            await createCardMut.mutateAsync({
              topicId,
              payload: {
                word: word.word,
                meaning: word.meaning,
                pronunciation: word.phonetic,
                partOfSpeech: word.partOfSpeech
              }
            });
            successCount++;
          }
        } else {
          // Assuming it's updated, since we don't track pristine state easily, we just PUT it
          await updateCardMut.mutateAsync({
            topicId,
            cardId: word.id,
            payload: {
              word: word.word,
              meaning: word.meaning,
              pronunciation: word.phonetic,
              partOfSpeech: word.partOfSpeech
            }
          });
          successCount++;
        }
      } catch (e: any) {
        errors.push(e.message || "Lỗi cập nhật từ vựng");
      }
    });

    await Promise.all(processPromises);

    setTimeout(() => {
      if (errors.length > 0) {
        showError(`Đã cập nhật ${successCount} từ vựng. Gặp lỗi: ${errors[0]}`);
      } else {
        showSuccess("Lưu thay đổi thành công!");
      }
      setModal(null);
      setEditTopic(null);
    }, 500); // UI delay convention
  };

  const deleteTopic = topics.find(t => t.id === deleteTopicId);

  return (
    <div
      className="w-full pb-30"
      onClick={() => setOpenKebab(null)}
    >
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <div className="font-[family-name:var(--font-heading)] font-bold text-[22px] text-[var(--text-primary)] mb-1">
            Quản lý Flashcard
          </div>
          <div className="font-[family-name:var(--font-body)] text-[13px] text-[var(--neutral-500)]">
            Tạo và quản lý chủ đề từ vựng cho học viên
          </div>
        </div>

        <div className="flex gap-4">
          <AssistantMaterialSortPopup currentSort={sort} onSortChange={setSort} />
          
          <div
            id="btn-create-flashcard-topic"
            onClick={e => { e.stopPropagation(); setModal('create'); }}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border-none bg-[var(--brand-500)] text-white font-[family-name:var(--font-heading)] font-bold text-[13px] cursor-pointer hover:bg-[var(--brand-600)] transition-colors"
            style={{ boxShadow: 'var(--shadow-clay-sm)' }}
          >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Tạo chủ đề
          </div>
        </div>
      </div>

      <AssistantSummaryChips metrics={metricsData?.data} />

      <AssistantTopicTable
        topics={topics}
        openKebab={openKebab}
        setOpenKebab={setOpenKebab}
        onDownloadTopic={() => setShowDevPopup(true)}
        onEditTopic={handleOpenEdit}
        onDeleteTopic={handleDeleteRequest}
      />

      {modal === 'create' && (
        <AssistantCreateTopicPopup
          onClose={() => setModal(null)}
          onCreate={handleCreateTopic}
        />
      )}
      {modal === 'edit' && editTopic && (
        <AssistantEditTopicPopup
          topic={editTopic}
          onClose={() => { setModal(null); setEditTopic(null); }}
          onSave={handleSaveTopicAndWords}
        />
      )}

      {deleteTopicId !== null && (
        <AssistantConfirmPopup
          title="Xóa chủ đề"
          message={`Bạn có chắc muốn xóa chủ đề "${deleteTopic?.title ?? ''}"? Toàn bộ từ vựng trong chủ đề này sẽ bị xóa và không thể hoàn tác.`}
          confirmLabel="Xóa"
          variant="danger"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTopicId(null)}
        />
      )}

      {showDevPopup && (
        <AssistantFeatureInDevPopup onClose={() => setShowDevPopup(false)} />
      )}
    </div>
  );
}
