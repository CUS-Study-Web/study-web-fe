import type { NotificationItem } from '../types/api/notification.api';

/**
 * Mock notifications simulating data that will come from the Backend.
 * Replace with real API calls once BE implements notification endpoints.
 */
export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    type: 'VIP_APPROVED',
    title: 'Yêu cầu VIP đã được duyệt',
    message: 'Tài khoản của bạn đã được nâng cấp lên VIP. Bạn có thể sử dụng tất cả tính năng cao cấp của CUS.',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 phút trước
  },
  {
    id: '2',
    type: 'NEW_DOCUMENT_CREATED',
    title: 'Tài liệu mới',
    message: 'Tài liệu "Tổng hợp công thức Giải Tích 1" vừa được thêm vào thư viện.',
    isRead: false,
    referenceId: 'doc-123',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 phút trước
  },
  {
    id: '3',
    type: 'COURSE_CONTENT_ADDED',
    title: 'Nội dung khóa học mới',
    message: 'Khóa học "Toán Cao Cấp" vừa được bổ sung đề thi thử số 03. Hãy vào làm thử ngay!',
    isRead: false,
    referenceId: 'course-math',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 giờ trước
  },
  {
    id: '4',
    type: 'NEW_FLASHCARD_TOPIC',
    title: 'Chủ đề Flashcard mới',
    message: 'Chủ đề "Từ vựng tiếng Anh chuyên ngành CNTT" vừa được ra mắt.',
    isRead: true,
    referenceId: 'topic-it',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 ngày trước
  },
  {
    id: '5',
    type: 'VIP_EXPIRING',
    title: 'Gói VIP sắp hết hạn',
    message: 'Gói VIP của bạn sẽ hết hạn sau 3 ngày. Hãy gia hạn để không bị gián đoạn.',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 ngày trước
  },
  {
    id: '6',
    type: 'VIP_REJECTED',
    title: 'Yêu cầu VIP bị từ chối',
    message: 'Yêu cầu nâng cấp VIP của bạn đã bị từ chối do ảnh chụp giao dịch không hợp lệ.',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 ngày trước
  },
  {
    id: '7',
    type: 'ACCOUNT_UNLOCKED',
    title: 'Tài khoản đã được mở khóa',
    message: 'Tài khoản của bạn đã được quản trị viên mở khóa. Bạn có thể tiếp tục sử dụng bình thường.',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 ngày trước
  },
  {
    id: '8',
    type: 'ACCOUNT_LOCKED',
    title: 'Tài khoản bị khóa',
    message: 'Tài khoản của bạn tạm thời bị khóa do phát hiện hành vi bất thường. Vui lòng liên hệ hỗ trợ.',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 ngày trước
  },
  {
    id: '9',
    type: 'ACCOUNT_BANNED',
    title: 'Tài khoản bị cấm',
    message: 'Tài khoản của bạn đã bị cấm vĩnh viễn do vi phạm nghiêm trọng quy định của hệ thống.',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 ngày trước
  }
];
