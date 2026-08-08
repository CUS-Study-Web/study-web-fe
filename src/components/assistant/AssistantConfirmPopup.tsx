interface AssistantConfirmPopupProps {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

const VARIANT_CONFIG = {
  danger: {
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14H6L5 6" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M9 6V4h6v2" />
      </svg>
    ),
    btnClass: 'bg-red-500 hover:bg-red-600 text-white',
  },
  warning: {
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    btnClass: 'bg-amber-500 hover:bg-amber-600 text-white',
  },
  info: {
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    btnClass: 'bg-blue-500 hover:bg-blue-600 text-white',
  },
};

export default function AssistantConfirmPopup({
  title,
  message,
  confirmLabel = 'Xác nhận',
  cancelLabel = 'Hủy',
  variant = 'danger',
  onConfirm,
  onCancel,
}: AssistantConfirmPopupProps) {
  const config = VARIANT_CONFIG[variant];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-[20px] shadow-2xl w-[400px] max-w-[calc(100vw-32px)] p-6 flex flex-col gap-5"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon + Title */}
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full ${config.iconBg} ${config.iconColor} flex items-center justify-center shrink-0`}>
            {config.icon}
          </div>
          <div>
            <div className="font-[family-name:var(--font-heading)] font-bold text-[17px] text-[var(--text-primary)]">
              {title}
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="font-[family-name:var(--font-body)] text-[14px] text-[var(--text-secondary)] leading-relaxed">
          {message}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-1">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-[10px] border border-[var(--border-default)] font-[family-name:var(--font-heading)] font-semibold text-[14px] text-[var(--text-primary)] bg-white hover:bg-[var(--surface-muted)] cursor-pointer transition-colors select-none"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-[10px] font-[family-name:var(--font-heading)] font-semibold text-[14px] cursor-pointer transition-colors select-none border-none ${config.btnClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
