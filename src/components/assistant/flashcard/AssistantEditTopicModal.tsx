import { useState, useRef } from 'react';
import type { FlashcardTopic, VocabularyWord } from '../../../types/assistant/models';

const EDIT_PER_PAGE = 20;

// Grid template for the 4 vocabulary columns (equal width)
const WORD_ROW_GRID = 'grid-cols-4';

// ─── Editable Cell ────────────────────────────────────────────────────────────

interface EditableCellProps {
  value: string;
  placeholder: string;
  onChange: (val: string) => void;
  isHovered: boolean;
}

function EditableCell({ value, placeholder, onChange, isHovered }: EditableCellProps) {
  const [isFocused, setIsFocused] = useState(false);

  const getBorder = () => {
    if (isFocused) return 'var(--brand-500)';
    if (isHovered) return 'var(--border-strong)';
    return 'transparent';
  };
  const getBg = () => {
    if (isFocused) return 'var(--brand-soft-100)';
    if (isHovered) return '#FAFCFA';
    return 'transparent';
  };

  return (
    <div className="px-3.5 py-2">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-2 py-1.5 rounded-[7px] outline-none font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] transition-all duration-[140ms]"
        style={{
          border: `1.5px solid ${getBorder()}`,
          background: getBg(),
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}

// ─── Edit Topic Modal ─────────────────────────────────────────────────────────

interface AssistantEditTopicModalProps {
  topic: FlashcardTopic;
  initialWords: VocabularyWord[];
  onClose: () => void;
  onSave: (words: VocabularyWord[]) => void;
}

export function AssistantEditTopicModal({
  topic,
  initialWords,
  onClose,
  onSave,
}: AssistantEditTopicModalProps) {
  const [editWords, setEditWords] = useState<VocabularyWord[]>(initialWords);
  const [editSearch, setEditSearch] = useState('');
  const [editPage, setEditPage] = useState(1);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  // ─── Derived state ──────────────────────────────────────────────────────────
  const filteredWords = editWords.filter(
    w =>
      w.en.toLowerCase().includes(editSearch.toLowerCase()) ||
      w.vi.toLowerCase().includes(editSearch.toLowerCase()),
  );
  const totalPages = Math.max(1, Math.ceil(filteredWords.length / EDIT_PER_PAGE));
  const pageWords = filteredWords.slice((editPage - 1) * EDIT_PER_PAGE, editPage * EDIT_PER_PAGE);

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const updateWord = (id: number, field: keyof VocabularyWord, val: string) =>
    setEditWords(ws => ws.map(w => (w.id === id ? { ...w, [field]: val } : w)));

  const handleAddWord = () => {
    const newWord: VocabularyWord = { id: Date.now(), en: '', phonetic: '', type: 'Noun', vi: '', ex: '' };
    const newWords = [...editWords, newWord];
    setEditWords(newWords);
    const newFiltered = newWords.filter(
      w =>
        w.en.toLowerCase().includes(editSearch.toLowerCase()) ||
        w.vi.toLowerCase().includes(editSearch.toLowerCase()),
    );
    setEditPage(Math.max(1, Math.ceil(newFiltered.length / EDIT_PER_PAGE)));
  };

  const handleSearchChange = (val: string) => {
    setEditSearch(val);
    setEditPage(1);
  };

  const columns: { key: keyof VocabularyWord; header: string; placeholder: string }[] = [
    { key: 'en', header: 'Tiếng Anh', placeholder: 'VD: Perseverance' },
    { key: 'phonetic', header: 'Phiên âm', placeholder: '/ˌpɜː.sɪˈvɪər.əns/' },
    { key: 'type', header: 'Từ loại', placeholder: 'Noun' },
    { key: 'vi', header: 'Tiếng Việt', placeholder: 'VD: Sự kiên trì' },
  ];

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      {/* Dialog */}
      <div
        className="bg-white rounded-[22px] w-full max-w-[900px] max-h-[92vh] flex flex-col overflow-hidden"
        style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.22)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-7 py-5 shrink-0"
          style={{ background: 'linear-gradient(135deg, var(--brand-500), var(--brand-700))' }}
        >
          <div className="font-[family-name:var(--font-heading)] font-extrabold text-[17px] text-white">
            Chỉnh sửa: {topic.title}
          </div>
          <div
            className="font-[family-name:var(--font-body)] text-[12px] mt-0.5"
            style={{ color: 'rgba(220,233,222,0.7)' }}
          >
            {topic.words} từ vựng · Chỉnh sửa trực tiếp trên bảng
          </div>
        </div>

        {/* Search toolbar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-[var(--surface-500)] shrink-0 flex-wrap">
          {/* Search input */}
          <div className="flex-1 relative min-w-[180px]">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="var(--neutral-400)"
              strokeWidth="1.6"
            >
              <circle cx="7" cy="7" r="5" />
              <line x1="11" y1="11" x2="14" y2="14" />
            </svg>
            <input
              type="text"
              value={editSearch}
              onChange={e => handleSearchChange(e.target.value)}
              placeholder="Tìm kiếm từ vựng..."
              className="w-full pl-[34px] pr-3 py-2.5 rounded-[10px] border border-[var(--border-strong)] outline-none font-[family-name:var(--font-body)] text-[13px] focus:border-[var(--brand-500)] focus:bg-[var(--brand-soft-100)] transition-colors"
              style={{ boxSizing: 'border-box' }}
            />
          </div>
          {/* Add word button */}
          <div
            onClick={handleAddWord}
            className="flex items-center gap-1.5 px-[18px] py-2.5 rounded-[10px] border-none bg-[var(--brand-500)] text-white font-[family-name:var(--font-heading)] font-bold text-[13px] cursor-pointer whitespace-nowrap hover:bg-[var(--brand-600)] transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Thêm từ vựng
          </div>
        </div>

        {/* Editable word list */}
        <div ref={tableContainerRef} className="flex-1 overflow-y-auto">

          {/* Column header row */}
          <div className={`grid ${WORD_ROW_GRID} sticky top-0 z-10 bg-[var(--surface-500)]`}>
            {columns.map(col => (
              <div
                key={col.key}
                className="px-3.5 py-[11px] font-[family-name:var(--font-heading)] font-bold text-[11px] text-[var(--neutral-500)] text-left uppercase tracking-[0.4px] whitespace-nowrap border-b border-[var(--border-default)]"
              >
                {col.header}
              </div>
            ))}
          </div>

          {/* Word rows */}
          {pageWords.length === 0 ? (
            <div className="px-8 py-8 text-center font-[family-name:var(--font-body)] text-[13px] text-[var(--neutral-400)]">
              Không tìm thấy từ vựng.
            </div>
          ) : (
            pageWords.map(word => (
              <div
                key={word.id}
                className={`grid ${WORD_ROW_GRID} items-center border-b border-[var(--surface-500)]`}
                onMouseEnter={() => setHoveredRow(word.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {columns.map(col => (
                  <EditableCell
                    key={col.key}
                    value={word[col.key] as string}
                    placeholder={col.placeholder}
                    onChange={val => updateWord(word.id, col.key, val)}
                    isHovered={hoveredRow === word.id}
                  />
                ))}
              </div>
            ))
          )}
        </div>

        {/* Footer with pagination + action buttons */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-[var(--surface-500)] shrink-0 flex-wrap gap-3">
          {/* Pagination */}
          <div className="flex items-center gap-2">
            {/* Prev */}
            <div
              onClick={() => setEditPage(p => Math.max(1, p - 1))}
              className="w-[30px] h-[30px] rounded-lg border border-[var(--border-strong)] flex items-center justify-center transition-colors disabled:cursor-default disabled:bg-[var(--surface-500)] enabled:cursor-pointer enabled:bg-white enabled:hover:bg-[var(--surface-500)]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </div>

            <span className="font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-secondary)]">
              Trang {editPage} / {totalPages}
            </span>

            {/* Next */}
            <div
              onClick={() => setEditPage(p => Math.min(totalPages, p + 1))}
              className="w-[30px] h-[30px] rounded-lg border border-[var(--border-strong)] flex items-center justify-center transition-colors cursor-pointer enabled:bg-white enabled:hover:bg-[var(--surface-500)]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>

            <span className="font-[family-name:var(--font-body)] text-[12px] text-[var(--neutral-400)] ml-1">
              {filteredWords.length} từ
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2.5">
            <div
              onClick={onClose}
              className="px-[22px] py-2.5 rounded-[11px] border border-[var(--border-strong)] bg-white text-[var(--text-secondary)] font-[family-name:var(--font-heading)] font-semibold text-[13px] cursor-pointer hover:bg-[var(--surface-500)] transition-colors"
            >
              Hủy
            </div>
            <div
              onClick={() => { onSave(editWords); onClose(); }}
              className="px-[26px] py-2.5 rounded-[11px] border-none bg-[var(--brand-500)] text-white font-[family-name:var(--font-heading)] font-bold text-[13px] cursor-pointer hover:bg-[var(--brand-600)] transition-colors"
            >
              Lưu thay đổi
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
