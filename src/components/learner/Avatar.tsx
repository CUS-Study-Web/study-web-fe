import { useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useUpdateAvatarMutation } from '../../hooks/queries/useProfile';
import { useNotification } from '../common/NotificationProvider';

type AvatarProps = {
  size?: 'sm' | 'lg';
  showEdit?: boolean;
  className?: string;
};

export default function Avatar({ size = 'sm', showEdit, className = '' }: AvatarProps) {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
  const updateAvatarMutation = useUpdateAvatarMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isLg = size === 'lg';
  const containerSize = isLg ? 'w-20 h-20' : 'w-10 h-10';
  const iconSize = isLg ? '40' : '20';
  const borderClass = isLg ? 'border-2 border-[#3c6d42]' : '';
  const bgClass = isLg ? 'bg-[#254d2d]' : 'bg-[var(--brand-base-600)]';

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input so same file can be re-selected
    e.target.value = '';

    updateAvatarMutation.mutate(file, {
      onSuccess: () => {
        setTimeout(() => showSuccess('Ảnh đại diện đã được cập nhật!'), 300);
      },
      onError: (error: any) => {
        const isTooLarge =
          error?.response?.status === 413 ||
          error?.response?.data?.code === 'FILE_005';
        const message = isTooLarge
          ? 'Vượt quá size limit, hãy thử file nhỏ hơn'
          : error?.response?.data?.message || 'Tải ảnh thất bại. Vui lòng thử lại!';
        setTimeout(() => showError(message), 300);
      },
    });
  };

  const avatarUrl = user?.avatarUrl;

  return (
    <div className={`relative ${className}`}>
      <div
        className={`${containerSize} rounded-full ${bgClass} ${borderClass} flex items-center justify-center ${isLg ? 'shadow-lg' : ''} overflow-hidden`}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={user?.name || 'Avatar'}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9cb6a0"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        )}
      </div>

      {showEdit && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-white border border-[var(--border-300)] flex items-center justify-center cursor-pointer shadow-sm hover:bg-gray-100 transition-colors disabled:opacity-60"
            aria-label="Đổi ảnh đại diện"
            onClick={handleEditClick}
            disabled={updateAvatarMutation.isPending}
          >
            {updateAvatarMutation.isPending ? (
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#333"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-spin"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            ) : (
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#333"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
            )}
          </button>
        </>
      )}
    </div>
  );
}
