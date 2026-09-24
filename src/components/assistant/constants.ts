import { ROUTES } from "../../utils/routes";

export type PageKey = 'asst-dashboard' | 'asst-courses' | 'asst-materials' | 'asst-students' | 'asst-flashcards';

export const ASSISTANT_MENU: { key: PageKey; icon: string; label: string; path: string }[] = [
  { key: 'asst-dashboard', icon: '📊', label: 'Tổng quan', path: ROUTES.ASSISTANT.DASHBOARD },
  { key: 'asst-courses', icon: '📎', label: 'Nội dung khóa học', path: ROUTES.ASSISTANT.COURSES },
  { key: 'asst-materials', icon: '📝', label: 'Tài liệu', path: ROUTES.ASSISTANT.MATERIALS },
  { key: 'asst-students', icon: '👥', label: 'Học viên', path: ROUTES.ASSISTANT.STUDENTS },
  { key: 'asst-flashcards', icon: '🃏', label: 'Flashcard', path: ROUTES.ASSISTANT.FLASHCARDS },
];
