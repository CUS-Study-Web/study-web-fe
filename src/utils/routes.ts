export const ROUTES = {
  HOME: '/',
  COURSES: '/courses',
  COURSE_DETAIL: (courseId: string | number = ':courseId') => `/courses/${courseId}`,
  TRIAL: '/trial',
  DOCUMENTS: '/documents',
  ABOUT: '/about',
  VIP: '/vip',
  NOT_FOUND: '/404',
  UNDER_DEVELOPMENT: '/under-development',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  LEARNER: {
    ROOT: '/learner',
    DASHBOARD: '/learner/dashboard',
  },
  ASSISTANT: {
    ROOT: '/assistant',
    DASHBOARD: '/assistant/dashboard',
    COURSES: '/assistant/courses',
    MATERIALS: '/assistant/materials',
    STUDENTS: '/assistant/students',
  },
  ADMIN: {
    ROOT: '/admin',
    DASHBOARD: '/admin/dashboard',
    SYSTEM: '/admin/system',
    WEBSITE: '/admin/website',
  },
} as const;
