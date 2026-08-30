import type { BadgeResponse } from '../../../types/api/badge.api';

interface AssistantBadgeSelectPopupProps {
  availableBadges: BadgeResponse[];
  selectedBadges: string[];
  toggleBadge: (badgeId: string) => void;
  onClose: () => void;
}

export default function AssistantBadgeSelectPopup({
  availableBadges,
  selectedBadges,
  toggleBadge,
  onClose,
}: AssistantBadgeSelectPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/45 z-[1010] flex items-center justify-center p-6" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-[var(--radius-xl)] w-full max-w-[750px] max-h-[80vh] flex flex-col shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-default)]">
          <div className="font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body-lg)] text-[var(--text-primary)]">
            Nhãn (Badges) - Chọn ít nhất 1, tối đa 2 nhãn
          </div>
          <button type="button" onClick={onClose} className="p-2 hover:bg-[var(--surface-500)] rounded-full transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 bg-[var(--surface-muted)]">
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {availableBadges.map(badge => {
              const isSelected = selectedBadges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  onClick={() => toggleBadge(badge.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-[var(--radius-md)] cursor-pointer transition-all border-[1.5px] bg-white ${isSelected ? 'border-[var(--brand-500)] shadow-[0_0_0_1px_var(--brand-500)]' : 'border-[var(--border-default)] hover:border-[var(--brand-300)]'}`}
                >
                  <div className={`w-5 h-5 rounded-[4px] border flex-shrink-0 flex items-center justify-center ${isSelected ? 'border-[var(--brand-500)] bg-[var(--brand-500)]' : 'border-gray-300'}`}>
                    {isSelected && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                  </div>
                  <span className="font-[family-name:var(--font-body)] text-xs text-center text-[var(--text-primary)] font-medium line-clamp-2">
                    {badge.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[var(--border-default)] flex justify-end bg-white">
          <div onClick={onClose} className="px-6 py-2.5 rounded-[var(--radius-md)] bg-[var(--brand-500)] cursor-pointer text-white font-[family-name:var(--font-heading)] font-semibold text-sm hover:bg-[var(--brand-600)] transition-colors">
            Xác nhận
          </div>
        </div>
      </div>
    </div>
  );
}
