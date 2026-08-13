import { useState, useRef } from 'react';
import type { FlashcardTopic, VocabularyWord } from '../../../types/assistant/models';
import AssistantConfirmPopup from '../AssistantConfirmPopup';

const EDIT_PER_PAGE = 20;

// Grid template for the 4 vocabulary columns (equal width) plus delete button
const WORD_ROW_GRID = 'grid-cols-[1fr_1fr_1fr_1fr_40px]';

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

interface AssistantEditTopicPopupProps {
  topic: FlashcardTopic;
  initialWords: VocabularyWord[];
  onClose: () => void;
  onSave: (words: VocabularyWord[], status: 'published' | 'draft') => void;
}

export function AssistantEditTopicPopup({
  topic,
  initialWords,
  onClose,
  onSave,
}: AssistantEditTopicPopupProps) {
  const [editWords, setEditWords] = useState<VocabularyWord[]>(initialWords);
  const [status, setStatus] = useState<'published' | 'draft'>(topic.status as 'published' | 'draft');
  const [editSearch, setEditSearch] = useState('');
  const [editPage, setEditPage] = useState(1);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

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

  const handleDeleteWord = (id: number) => {
    setEditWords(ws => {
      const newWords = ws.filter(w => w.id !== id);
      const newFiltered = newWords.filter(
        w =>
          w.en.toLowerCase().includes(editSearch.toLowerCase()) ||
          w.vi.toLowerCase().includes(editSearch.toLowerCase()),
      );
      setEditPage(p => Math.min(p, Math.max(1, Math.ceil(newFiltered.length / EDIT_PER_PAGE))));
      return newWords;
    });
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Handle file parsing here
      console.log('File selected:', file.name);
      e.target.value = ''; // reset
    }
  };

  const handleClearWords = () => {
    setShowClearConfirm(true);
  };

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
    <>
      {/* Backdrop */}
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
          {/* Status field */}
          <div className="flex w-[180px] rounded-[8px] overflow-hidden border border-[var(--border-default)] shrink-0">
            <div
              onClick={() => setStatus('published')}
              className={`flex-1 py-1.5 text-center font-[family-name:var(--font-heading)] font-semibold text-[13px] cursor-pointer transition-colors select-none ${
                status === 'published'
                  ? 'bg-[var(--brand-500)] text-white'
                  : 'bg-white text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]'
              }`}
            >
              Xuất bản
            </div>
            <div
              onClick={() => setStatus('draft')}
              className={`flex-1 py-1.5 text-center font-[family-name:var(--font-heading)] font-semibold text-[13px] cursor-pointer transition-colors select-none border-l border-[var(--border-default)] ${
                status === 'draft'
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]'
              }`}
            >
              Nháp
            </div>
          </div>
          {/* Action buttons */}
          <div
            onClick={handleClearWords}
            className="flex items-center justify-center px-4 py-2.5 rounded-[10px] border border-[var(--border-strong)] bg-white text-[var(--text-secondary)] font-[family-name:var(--font-heading)] font-semibold text-[13px] cursor-pointer hover:bg-[var(--surface-500)] transition-colors whitespace-nowrap"
          >
            Làm mới
          </div>

          <div
            onClick={handleUploadFileClick}
            className="flex items-center justify-center px-4 py-2.5 rounded-[10px] border border-[var(--border-strong)] bg-white text-[var(--text-secondary)] font-[family-name:var(--font-heading)] font-semibold text-[13px] cursor-pointer hover:bg-[var(--surface-500)] transition-colors whitespace-nowrap"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="mr-1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Thêm bằng file
          </div>
          
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

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

        {/* Warning Note */}
        <div className="px-6 py-4 shrink-0">
          <div
            className="rounded-[10px] px-3.5 py-2.5 flex items-center gap-2"
            style={{
              background: 'var(--warning-50)',
              border: '1px solid var(--warning-100)',
            }}
          >
            <span className="text-[14px] shrink-0">⚠️</span>
            <div
              className="font-[family-name:var(--font-body)] text-[12px] leading-[1.55]"
              style={{ color: 'var(--warning-800)' }}
            >
              <span className="font-bold">Lưu ý:</span> File Excel upload phải bao gồm các cột theo đúng thứ tự sau:{' '}
              <span className="font-bold">Tiếng Anh · Phiên âm · Từ loại · Tiếng Việt</span>
            </div>
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
            <div className="border-b border-[var(--border-default)]"></div>
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
                <div className="flex items-center justify-center">
                  <div
                    onClick={() => handleDeleteWord(word.id)}
                    className="w-7 h-7 rounded-md flex items-center justify-center cursor-pointer text-[var(--neutral-400)] hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Xóa dòng"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M3 6h18" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </div>
                </div>
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
              onClick={() => setShowConfirm(true)}
              className="px-[26px] py-2.5 rounded-[11px] border-none bg-[var(--brand-500)] text-white font-[family-name:var(--font-heading)] font-bold text-[13px] cursor-pointer hover:bg-[var(--brand-600)] transition-colors"
            >
              Lưu thay đổi
            </div>
          </div>
        </div>
      </div>
    </div>

      {showConfirm && (
        <AssistantConfirmPopup
          title="Xác nhận chỉnh sửa"
          message={`Bạn có chắc chắn muốn lưu thay đổi cho chủ đề "${topic.title}"?`}
          confirmLabel="Lưu"
          variant="warning"
          onConfirm={() => { onSave(editWords, status); setShowConfirm(false); onClose(); }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      {showClearConfirm && (
        <AssistantConfirmPopup
          title="Xác nhận làm mới"
          message="Bạn có chắc chắn muốn xóa tất cả từ vựng hiện tại?"
          confirmLabel="Làm mới"
          variant="info"
          onConfirm={() => { setEditWords([]); setEditPage(1); setShowClearConfirm(false); }}
          onCancel={() => setShowClearConfirm(false)}
        />
      )}
    </>
  );
}
