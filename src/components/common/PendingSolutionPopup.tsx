type PendingSolutionPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
};

export default function PendingSolutionPopup({ 
  isOpen, 
  onClose,
  title = "Đang cập nhật lời giải",
  message = "Lời giải chi tiết đang được cập nhập. Bạn vui lòng quay lại sau nhé!"
}: PendingSolutionPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-[20px] shadow-xl w-[90%] max-w-[320px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 text-center flex flex-col items-center">
          <div className="w-[50px] h-[50px] bg-[#fffdf5] border border-[#fde68a] rounded-full flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#d97706" strokeWidth="2" />
              <path d="M12 8V13" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="16" r="1" fill="#d97706" />
            </svg>
          </div>

          <div className="font-[family-name:var(--font-heading)] font-bold text-lg text-[var(--text-primary)] mb-2">
            {title}
          </div>

          <div className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-secondary)] mb-6 leading-relaxed">
            {message}
          </div>

          <div
            onClick={onClose}
            className="w-full bg-[var(--brand-base-500)] hover:opacity-90 text-white font-[family-name:var(--font-heading)] font-bold text-[13px] py-2.5 rounded-full transition-all active:scale-95"
          >
            Đã hiểu
          </div>
        </div>
      </div>
    </div>
  );
}
