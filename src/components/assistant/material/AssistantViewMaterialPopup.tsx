import type { AssistantDocument } from '../../../types/assistant/models';

interface AssistantViewMaterialPopupProps {
  material: AssistantDocument | null;
  onClose: () => void;
}

export default function AssistantViewMaterialPopup({ material, onClose }: AssistantViewMaterialPopupProps) {
  if (!material) return null;

  return (
    <div className="fixed inset-0 bg-black/45 z-[1000] flex items-center justify-center p-6" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div
        className="bg-[var(--surface-card)] rounded-[var(--radius-xl)] p-7 w-full max-w-[680px] max-h-[92vh] flex flex-col shadow-[0_8px_40px_rgba(0,0,0,0.18)]"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="font-[family-name:var(--font-heading)] font-extrabold text-[length:var(--text-body-lg)] text-[var(--text-primary)] m-0">
            Xem tài liệu
          </div>
          <div onClick={onClose} className="text-[var(--text-secondary)] text-2xl hover:text-[var(--text-primary)] bg-transparent border-none cursor-pointer">
            ×
          </div>
        </div>

        <div className="flex-1 bg-[var(--surface-muted)] rounded-[var(--radius-md)] flex flex-col items-center justify-center gap-3 min-h-[340px]">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="6" width="36" height="46" rx="4" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2"/>
            <path d="M38 6v12h10" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="10" y="6" width="38" height="12" rx="4" fill="none"/>
            <line x1="18" y1="30" x2="46" y2="30" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="18" y1="38" x2="46" y2="38" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="18" y1="46" x2="34" y2="46" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <div className="font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-secondary)]">
            Xem trước tài liệu {material.fileType}
          </div>
          <div className="font-[family-name:var(--font-heading)] font-semibold text-[length:var(--text-body-sm)] text-[var(--text-primary)]">
            {material.title}.{material.fileType.toLowerCase()}
          </div>
        </div>

        <div className="flex gap-2.5 mt-5">
          <div
            onClick={onClose}
            className="flex-1 p-3 flex items-center justify-center rounded-[var(--radius-md)] border-[1.5px] border-[var(--border-default)] bg-[var(--surface-card)] text-[var(--text-primary)] font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body-sm)] cursor-pointer hover:bg-[var(--surface-muted)]"
          >
            Thoát
          </div>
          <div
            className="flex-[2] p-3 flex items-center justify-center rounded-[var(--radius-md)] border-none bg-[var(--brand-500)] text-[var(--text-inverse)] font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body-sm)] cursor-pointer hover:bg-[var(--brand-600)]"
          >
            Tải về
          </div>
        </div>
      </div>
    </div>
  );
}
