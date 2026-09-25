import { Trash2, AlertTriangle, Info } from 'lucide-react';

interface AssistantConfirmPopupProps {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const VARIANT_CONFIG = {
  danger: {
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
    icon: <Trash2 size={24} />,
    btnClass: 'bg-red-500 hover:bg-red-600 !text-white',
  },
  warning: {
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    icon: <AlertTriangle size={24} />,
    btnClass: 'bg-amber-500 hover:bg-amber-600 !text-white',
  },
  info: {
    iconBg: 'bg-green-100',
    iconColor: 'text-green-800',
    icon: <Info size={24} />,
    btnClass: 'bg-green-800 hover:bg-green-800 !text-white',
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
  isLoading = false,
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
            onClick={isLoading ? undefined : onCancel}
            disabled={isLoading}
            className="!flex-1 !py-2.5 !flex !justify-center !items-center !rounded-[10px] !border !border-[var(--border-default)] !font-[family-name:var(--font-heading)] !font-semibold !text-[14px] !text-[var(--text-primary)] !bg-white !hover:bg-[var(--surface-muted)] !cursor-pointer !transition-colors !select-none !disabled:opacity-50 !disabled:cursor-not-allowed"
          >
            {cancelLabel}
          </button>
          <button
            onClick={isLoading ? undefined : onConfirm}
            disabled={isLoading}
            className={`!flex-1 !py-2.5 !flex !justify-center !items-center !rounded-[10px] !font-[family-name:var(--font-heading)] !font-semibold !text-[14px] !cursor-pointer !transition-colors !select-none !disabled:opacity-50 !disabled:cursor-not-allowed ${config.btnClass}`}
          >
            {isLoading ? 'Đang xử lý...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
