interface AssistantFeatureInDevPopupProps {
  onClose: () => void;
}

export default function AssistantFeatureInDevPopup({ onClose }: AssistantFeatureInDevPopupProps) {
  return (
    <div
      className="fixed inset-0 bg-black/45 z-[2000] flex items-center justify-center p-6"
      onClick={(e) => { 
        e.stopPropagation();
        if (e.target === e.currentTarget) onClose(); 
      }}
    >
      <div className="bg-[var(--surface-card)] rounded-[var(--radius-xl)] py-7 px-7 w-full max-w-[400px] shadow-[0_8px_40px_rgba(0,0,0,0.18)] text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-[var(--brand-100)] text-[var(--brand-600)] flex items-center justify-center mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        </div>
        <div className="font-[family-name:var(--font-heading)] font-extrabold text-[18px] text-[var(--text-primary)] mb-2">
          Tính năng đang phát triển
        </div>
        <div className="font-[family-name:var(--font-body)] text-[14px] text-[var(--text-secondary)] mb-6">
          Tính năng này đang trong quá trình hoàn thiện và sẽ sớm ra mắt trong các phiên bản tiếp theo.
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="w-full flex items-center justify-center py-3 rounded-[var(--radius-md)] bg-[var(--brand-500)] text-white font-[family-name:var(--font-heading)] font-bold text-[14px] cursor-pointer hover:bg-[var(--brand-600)] transition-colors"
        >
          Đã hiểu
        </div>
      </div>
    </div>
  );
}
