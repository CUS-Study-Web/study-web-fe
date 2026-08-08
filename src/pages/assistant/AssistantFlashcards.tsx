import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { FlashcardTopic, FlashcardModalState, VocabularyWord } from '../../types/assistant/models';
import { DEMO_FLASHCARD_TOPICS, DEMO_VOCABULARY_WORDS } from '../../types/assistant/mockData';
import { AssistantSummaryChips, AssistantTopicTable } from '../../components/assistant/flashcard/AssistantFlashcardTable';
import { AssistantCreateTopicModal } from '../../components/assistant/flashcard/AssistantCreateTopicModal';
import { AssistantEditTopicModal } from '../../components/assistant/flashcard/AssistantEditTopicModal';
import AssistantConfirmPopup from '../../components/assistant/AssistantConfirmPopup';
import AssistantFeatureInDevPopup from '../../components/assistant/AssistantFeatureInDevPopup';

export default function AssistantFlashcards() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ─── Page-level state ───────────────────────────────────────────────────────
  const [topics, setTopics] = useState<FlashcardTopic[]>(DEMO_FLASHCARD_TOPICS);
  const [modal, setModal] = useState<FlashcardModalState>(() =>
    searchParams.get('create') === '1' ? 'create' : null
  );
  const [openKebab, setOpenKebab] = useState<number | null>(null);
  const [editTopic, setEditTopic] = useState<FlashcardTopic | null>(null);
  const [editWords, setEditWords] = useState<VocabularyWord[]>(DEMO_VOCABULARY_WORDS);
  const [deleteTopicId, setDeleteTopicId] = useState<number | null>(null);
  const [showDevPopup, setShowDevPopup] = useState(false);

  // Clear URL param after reading it once
  useEffect(() => {
    if (searchParams.get('create') === '1') {
      setSearchParams({}, { replace: true });
    }
  }, []);

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const handleOpenEdit = (topic: FlashcardTopic) => {
    setEditTopic(topic);
    setModal('edit');
    setOpenKebab(null);
  };

  const handleDeleteRequest = (id: number) => {
    setDeleteTopicId(id);
    setOpenKebab(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteTopicId !== null) {
      setTopics(prev => prev.filter(t => t.id !== deleteTopicId));
    }
    setDeleteTopicId(null);
  };

  const handleCreate = (name: string, _fileName: string) => {
    const newTopic: FlashcardTopic = {
      id: Date.now(),
      title: name,
      words: 0,
      created: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      status: 'Nháp',
    };
    setTopics(prev => [...prev, newTopic]);
    setModal(null);
  };

  const handleSaveWords = (words: VocabularyWord[]) => {
    setEditWords(words);
    if (editTopic) {
      setTopics(prev =>
        prev.map(t => (t.id === editTopic.id ? { ...t, words: words.length } : t)),
      );
    }
    setModal(null);
  };

  const deleteTopic = topics.find(t => t.id === deleteTopicId);

  return (
    /* Page container — click to close any open kebab */
    <div
      className="w-full"
      onClick={() => setOpenKebab(null)}
    >
      {/* Page header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <div className="font-[family-name:var(--font-heading)] font-bold text-[22px] text-[var(--text-primary)] mb-1">
            Quản lý Flashcard
          </div>
          <div className="font-[family-name:var(--font-body)] text-[13px] text-[var(--neutral-500)]">
            Tạo và quản lý chủ đề từ vựng cho học viên
          </div>
        </div>

        {/* Primary action button */}
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

      {/* Summary chips */}
      <AssistantSummaryChips topics={topics} />

      {/* Topic table */}
      <AssistantTopicTable
        topics={topics}
        openKebab={openKebab}
        setOpenKebab={setOpenKebab}
        onDownloadTopic={() => setShowDevPopup(true)}
        onEditTopic={handleOpenEdit}
        onDeleteTopic={handleDeleteRequest}
      />

      {/* Modals */}
      {modal === 'create' && (
        <AssistantCreateTopicModal
          onClose={() => setModal(null)}
          onCreate={handleCreate}
        />
      )}

      {modal === 'edit' && editTopic && (
        <AssistantEditTopicModal
          topic={editTopic}
          initialWords={editWords}
          onClose={() => setModal(null)}
          onSave={handleSaveWords}
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
