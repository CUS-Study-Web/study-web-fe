import { useState } from 'react';

interface AssistantCreateTopicModalProps {
  onClose: () => void;
  onCreate: (name: string, fileName: string) => void;
}

export function AssistantCreateTopicModal({ onClose, onCreate }: AssistantCreateTopicModalProps) {
  const [topicName, setTopicName] = useState('');
  const [fileName, setFileName] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  // ─── Drag & Drop handlers ───────────────────────────────────────────────────
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = () => setIsDragOver(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setFileName(file.name);
  };
  const handleDropzoneClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls,.csv';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) setFileName(file.name);
    };
    input.click();
  };

  const handleCreate = () => {
    if (!topicName.trim()) return;
    onCreate(topicName.trim(), fileName);
    onClose();
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      {/* Dialog */}
      <div
        className="bg-white rounded-[22px] w-full max-w-[480px] flex flex-col overflow-hidden"
        style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.22)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-7 py-[22px]"
          style={{ background: 'linear-gradient(135deg, var(--brand-500), var(--brand-700))' }}
        >
          <div className="font-[family-name:var(--font-heading)] font-extrabold text-[18px] text-white">
            Tạo chủ đề mới
          </div>
          <div
            className="font-[family-name:var(--font-body)] text-[13px] mt-1"
            style={{ color: 'rgba(220,233,222,0.7)' }}
          >
            Đặt tên và tải lên file từ vựng
          </div>
        </div>

        {/* Body */}
        <div className="px-7 py-[22px] flex flex-col gap-[18px]">
          {/* Topic name */}
          <div>
            <div className="font-[family-name:var(--font-heading)] font-semibold text-[12px] text-[var(--text-secondary)] mb-1.5">
              Tên chủ đề
            </div>
            <input
              type="text"
              value={topicName}
              onChange={e => setTopicName(e.target.value)}
              placeholder="VD: Từ vựng học thuật cốt lõi"
              className="w-full px-3.5 py-[11px] rounded-[11px] border border-[var(--border-strong)] outline-none font-[family-name:var(--font-body)] text-[14px] text-[var(--text-primary)] focus:border-[var(--brand-500)] focus:bg-[var(--brand-soft-100)] transition-colors"
              style={{ boxSizing: 'border-box' }}
            />
          </div>

          {/* File upload */}
          <div>
            <div className="font-[family-name:var(--font-heading)] font-semibold text-[12px] text-[var(--text-secondary)] mb-1.5">
              Tải lên file Excel
            </div>

            {/* Dropzone */}
            <div
              className="rounded-[14px] px-5 py-7 text-center cursor-pointer transition-all duration-[180ms]"
              style={{
                border: isDragOver ? '2px dashed var(--brand-500)' : '2px dashed var(--border-strong)',
                background: isDragOver ? 'var(--brand-soft-200)' : '#FAFCFA',
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleDropzoneClick}
            >
              {/* Upload icon */}
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isDragOver ? 'var(--brand-500)' : 'var(--neutral-400)'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="block mx-auto mb-2.5"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>

              {fileName ? (
                <div className="font-[family-name:var(--font-heading)] font-bold text-[14px] text-[var(--brand-500)]">
                  {fileName}
                </div>
              ) : (
                <>
                  <div className="font-[family-name:var(--font-heading)] font-bold text-[14px] text-[var(--text-secondary)] mb-1">
                    Kéo thả file hoặc nhấn để chọn
                  </div>
                  <div className="font-[family-name:var(--font-body)] text-[12px] text-[var(--neutral-400)]">
                    Hỗ trợ .xlsx, .xls, .csv
                  </div>
                </>
              )}
            </div>

            {/* Warning note */}
            <div
              className="mt-3 rounded-[10px] px-3.5 py-2.5 flex items-start gap-2"
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
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2.5 px-7 pb-[22px] pt-3.5 border-t border-[var(--surface-500)]">
          <button
            onClick={onClose}
            className="px-[22px] py-2.5 rounded-[11px] border border-[var(--border-strong)] bg-white text-[var(--text-secondary)] font-[family-name:var(--font-heading)] font-semibold text-[13px] cursor-pointer hover:bg-[var(--surface-500)] transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleCreate}
            disabled={!topicName.trim()}
            className="px-7 py-2.5 rounded-[11px] border-none bg-[var(--brand-500)] text-white font-[family-name:var(--font-heading)] font-bold text-[13px] cursor-pointer hover:bg-[var(--brand-600)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Tạo
          </button>
        </div>
      </div>
    </div>
  );
}
