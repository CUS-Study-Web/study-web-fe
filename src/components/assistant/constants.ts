import type { ComponentType } from "react";
import { LayoutDashboard, BookOpen, FileText, Users, Layers, ClipboardList } from "lucide-react";
import { ROUTES } from "../../utils/routes";

export type PageKey = 'asst-dashboard' | 'asst-courses' | 'asst-materials' | 'asst-students' | 'asst-flashcards' | 'asst-offline-exam';

export const ASSISTANT_MENU: { key: PageKey; icon: ComponentType<{ className?: string }>; label: string; path: string }[] = [
  { key: 'asst-dashboard', icon: LayoutDashboard, label: 'Tổng quan', path: ROUTES.UNDER_DEVELOPMENT },
  { key: 'asst-courses', icon: BookOpen, label: 'Nội dung khóa học', path: ROUTES.ASSISTANT.COURSES },
  { key: 'asst-materials', icon: FileText, label: 'Tài liệu', path: ROUTES.ASSISTANT.MATERIALS },
  { key: 'asst-students', icon: Users, label: 'Học viên', path: ROUTES.ASSISTANT.STUDENTS },
  { key: 'asst-flashcards', icon: Layers, label: 'Flashcard', path: ROUTES.ASSISTANT.FLASHCARDS },
  { key: 'asst-offline-exam', icon: ClipboardList, label: 'Đăng ký thi thử offline', path: ROUTES.ASSISTANT.OFFLINE_EXAM },
];
