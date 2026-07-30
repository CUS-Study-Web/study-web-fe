export type PageKey = 'asst-dashboard' | 'asst-courses' | 'asst-exams' | 'asst-students';

export const ASST_MENU: { key: PageKey; icon: string; label: string; path: string }[] = [
  { key: 'asst-dashboard', icon: '📊', label: 'Tổng quan', path: '/asst/dashboard' },
  { key: 'asst-courses', icon: '📎', label: 'Nội dung khóa học', path: '/asst/courses' },
  { key: 'asst-exams', icon: '📝', label: 'Tài liệu', path: '/asst/exams' },
  { key: 'asst-students', icon: '👥', label: 'Học viên', path: '/asst/students' },
];
