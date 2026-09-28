import { useRef } from 'react';
import { User, Loader2, Pencil } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useUpdateAvatarMutation } from '../../hooks/queries/useProfile';
import { useNotification } from '../common/NotificationProvider';
import { FILE_SIZE_ERROR_MESSAGE } from '../../utils/fileUtils';

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
          ? FILE_SIZE_ERROR_MESSAGE
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
          <User size={Number(iconSize)} className="text-[#9cb6a0]" strokeWidth={1.5} />
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
              <Loader2 size={12} className="animate-spin text-[#333]" />
            ) : (
              <Pencil size={11} className="text-[#333]" strokeWidth={2.5} />
            )}
          </button>
        </>
      )}
    </div>
  );
}
