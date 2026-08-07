import { useState } from 'react';
import type { FlashcardTopic, FlashcardModalState, VocabularyWord } from '../../types/assistant/models';
import { DEMO_FLASHCARD_TOPICS, DEMO_VOCABULARY_WORDS } from '../../types/assistant/mockData';
import { AssistantSummaryChips, AssistantTopicTable } from '../../components/assistant/flashcard/AssistantFlashcardTable';
import { AssistantCreateTopicModal } from '../../components/assistant/flashcard/AssistantCreateTopicModal';
import { AssistantEditTopicModal } from '../../components/assistant/flashcard/AssistantEditTopicModal';

export default function AssistantFlashcards() {
  // ─── Page-level state ───────────────────────────────────────────────────────
  const [topics, setTopics] = useState<FlashcardTopic[]>(DEMO_FLASHCARD_TOPICS);
  const [modal, setModal] = useState<FlashcardModalState>(null);
  const [openKebab, setOpenKebab] = useState<number | null>(null);
  const [editTopic, setEditTopic] = useState<FlashcardTopic | null>(null);
  const [editWords, setEditWords] = useState<VocabularyWord[]>(DEMO_VOCABULARY_WORDS);

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const handleOpenEdit = (topic: FlashcardTopic) => {
    setEditTopic(topic);
    setModal('edit');
    setOpenKebab(null);
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

  return (
    /* Page container — click to close any open kebab */
    <div
      className="px-8 py-7 lg:px-8 md:px-6 min-h-full"
      onClick={() => setOpenKebab(null)}
    >
      {/* Page header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <div className="font-[family-name:var(--font-heading)] font-black text-[22px] text-[var(--text-primary)] mb-1">
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
        onEditTopic={handleOpenEdit}
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
    </div>
  );
}
