import { useNotification } from '../../components/common/NotificationProvider';

export const useAdminErrorHandler = () => {
  const { showError } = useNotification();

  return (err: any) => {
    const code = err.response?.data?.code || err.response?.data?.errorCode;
    const message = err.response?.data?.message || err.message || '';

    if (code === 'ADMIN_001' || message.includes('User is permanently banned')) {
      showError('Tài khoản này đã bị cấm vĩnh viễn.');
    } else if (code === 'ADMIN_002' || message.includes('User is locked')) {
      showError('Tài khoản đang bị khóa. Vui lòng mở khóa trước.');
    } else if (code === 'ADMIN_003' || message.includes('User not found')) {
      showError('Không tìm thấy người dùng.');
    } else if (code === 'ADMIN_004' || message.includes('Actions not allowed for this role')) {
      showError('Bạn không có quyền thực hiện hành động này.');
    } else if (code === 'ADMIN_005' || message.includes('User already existed')) {
      showError('Người dùng đã tồn tại trong hệ thống.');
    } else if (code === 'ADMIN_006' || message.includes('Vip request not found')) {
      showError('Không tìm thấy yêu cầu VIP này.');
    } else if (code === 'ADMIN_007' || message.includes('Status can only be changed')) {
      showError('Trạng thái không hợp lệ. Chỉ có thể xử lý khi yêu cầu đang chờ duyệt.');
    } else {
      showError(message ? `Lỗi: ${message}` : 'Đã xảy ra lỗi không xác định.');
    }
  };
};
