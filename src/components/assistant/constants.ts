export type PageKey = 'asst-dashboard' | 'asst-courses' | 'asst-materials' | 'asst-students';

export const ASSISTANT_MENU: { key: PageKey; icon: string; label: string; path: string }[] = [
  { key: 'asst-dashboard', icon: '📊', label: 'Tổng quan', path: '/assistant/dashboard' },
  { key: 'asst-courses', icon: '📎', label: 'Nội dung khóa học', path: '/assistant/courses' },
  { key: 'asst-materials', icon: '📝', label: 'Tài liệu', path: '/assistant/materials' },
  { key: 'asst-students', icon: '👥', label: 'Học viên', path: '/assistant/students' },
];

