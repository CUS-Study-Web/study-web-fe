import { useState, useRef, useEffect } from 'react';
import { formatTimeAgo } from '../../utils/timeFormat';
import { useAuth } from '../../contexts/AuthContext';
import {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
} from '../../hooks/queries/useNotifications';
import { Bell, BellOff } from 'lucide-react';

// ==========================================
// FILTER TAB TYPE
// ==========================================
type FilterTab = 'all' | 'unread';

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isLoggedIn, role } = useAuth();
  const isLearner = isLoggedIn && role === 'learner';

  // ponytail: query size=1 for unread count badge
  const { data: unreadData } = useGetNotificationsQuery(
    { isRead: false, page: 0, size: 1 },
    { enabled: isLearner }
  );
  const unreadCount = unreadData?.paging?.total ?? 0;

  // ponytail: query notifications list filtered by active tab
  const { data: listData, isLoading } = useGetNotificationsQuery(
    { isRead: activeTab === 'unread' ? false : undefined, page: 0, size: 20 },
    { enabled: isLearner }
  );
  const notifications = listData?.data ?? [];

  const markOneReadMutation = useMarkNotificationAsReadMutation();
  const markAllReadMutation = useMarkAllNotificationsAsReadMutation();

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const handleMarkAllRead = () => {
    if (unreadCount > 0 && !markAllReadMutation.isPending) {
      markAllReadMutation.mutate();
    }
  };

  const handleMarkOneRead = (id: string, isRead: boolean) => {
    if (!isRead && !markOneReadMutation.isPending) {
      markOneReadMutation.mutate(id);
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex items-center justify-center w-10 h-10 rounded-full bg-transparent hover:bg-[#e6efe8] active:scale-95 transition-all duration-150 cursor-pointer border-none"
        aria-label="Thông báo"
      >
        <Bell className="w-5 h-5 text-[#333a35]" />
        {/* Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center px-1 bg-[#EF4444] text-white text-[10px] font-bold rounded-full leading-none shadow-sm">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+8px)] w-[380px] bg-white border border-[var(--border-300)] rounded-[16px] shadow-[0_12px_40px_rgba(0,0,0,0.14)] overflow-hidden z-[200] animate-[fadeSlideDown_0.15s_ease-out]">
          {/* Header */}
          <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-[var(--border-200)]">
            <h3 className="font-[family:var(--font-heading)] font-extrabold text-[15px] text-[var(--text-primary-500)] m-0">
              Thông báo
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                disabled={markAllReadMutation.isPending}
                className="bg-transparent border-none cursor-pointer font-[family:var(--font-heading)] font-semibold text-[12px] text-[var(--brand-base-600)] hover:text-[#1e4022] p-0 transition-colors disabled:opacity-50"
              >
                Đánh dấu tất cả đã đọc
              </button>
            )}
          </div>

          {/* Tab Filters */}
          <div className="flex px-5 pt-3 pb-2 gap-1">
            {([
              { key: 'all' as FilterTab, label: 'Tất cả' },
              { key: 'unread' as FilterTab, label: `Chưa đọc (${unreadCount})` },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold cursor-pointer transition-all duration-150 border-none font-[family:var(--font-heading)] ${
                  activeTab === tab.key
                    ? 'bg-[#28522d] !text-white shadow-sm'
                    : 'bg-[var(--surface-500)] text-[var(--text-secondary-400)] hover:bg-[#e6efe8]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Notification List */}
          <div className="max-h-[380px] overflow-y-auto py-2 px-2 scrollbar-thin">
            {isLoading && notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 px-4">
                <div className="w-5 h-5 border-2 border-[var(--brand-base-600)] border-t-transparent rounded-full animate-spin mb-2" />
                <div className="font-[family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)] text-center">
                  Đang tải thông báo...
                </div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 px-4">
                <BellOff className="w-9 h-9 text-[var(--text-secondary-300)] mb-2" />
                <div className="font-[family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)] text-center">
                  {activeTab === 'unread' ? 'Không có thông báo chưa đọc' : 'Chưa có thông báo nào'}
                </div>
              </div>
            ) : (
              notifications.map((notif) => {
                return (
                  <button
                    key={notif.id}
                    onClick={() => handleMarkOneRead(notif.id, notif.isRead)}
                    className={`w-full flex items-start gap-3 px-4 py-3 rounded-[12px] cursor-pointer transition-all duration-150 text-left border-none ${
                      notif.isRead
                        ? 'bg-transparent hover:bg-[var(--surface-500)]'
                        : 'bg-[#f0faf2] hover:bg-[#e4f5e8]'
                    }`}
                  >
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <span
                          className={`font-[family:var(--font-heading)] text-[13px] leading-tight break-words ${
                            notif.isRead
                              ? 'font-semibold text-[var(--text-secondary-600)]'
                              : 'font-bold text-[var(--text-primary-500)]'
                          }`}
                        >
                          {notif.title}
                        </span>
                        {!notif.isRead && (
                          <span className="w-2 h-2 rounded-full bg-[var(--brand-base-600)] shrink-0 mt-1" />
                        )}
                      </div>
                      <p
                        className={`font-[family:var(--font-body)] text-[12px] leading-[1.4] mt-1 m-0 break-words whitespace-pre-line ${
                          notif.isRead ? 'text-[var(--text-secondary-300)]' : 'text-[var(--text-secondary-600)]'
                        }`}
                      >
                        {notif.message}
                      </p>
                      <span className="font-[family:var(--font-body)] text-[11px] text-[var(--text-secondary-200)] mt-1 block">
                        {formatTimeAgo(notif.createdAt)}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
