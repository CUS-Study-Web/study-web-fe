export interface AssistantActivity {
  id: number;
  type: string;
  text: string;
  time: string;
  icon: string;
}

export interface AssistantSubject {
  name: string;
  topicCount: number;
  lectureCount: number;
  exerciseCount: number;
}

export interface AssistantCourse {
  key: string;
  tag: string;
  accentColor: string;
  subjects: AssistantSubject[];
}

export interface AssistantCourseMaterial {
  id: number;
  title: string;
  course: string;
  questions: number;
  duration: string;
  date: string;
}

export interface AssistantCourseForm {
  title: string;
  subject: string;
  level: string;
  desc: string;
  price: string;
  sessions: string;
  status: string;
}

export interface AssistantDocument {
  id: number;
  title: string;
  subject: string;
  kythi: string;
  questions: number;
  duration: string;
  date: string;
  fileType: string;
  cat: string;
  access: string;
}

export interface AssistantExercise {
  id: number;
  title: string;
  topic: string;
  questions: number;
  fileType: string;
  uploadedAt: string;
}

export interface AssistantLecture {
  id: number;
  title: string;
  topic: string;
  link: string;
  uploadedAt: string;
}

export interface AssistantLesson {
  id: number;
  no: string;
  title: string;
  duration: string;
  type: string;
  status: string;
}

export interface AssistantLessonForm {
  title: string;
  type: string;
  file: string;
}

export interface AssistantStatCard {
  id: number;
  label: string;
  value: string;
  delta: string;
  icon: string;
  color: string;
  background: string;
}

export interface AssistantStudent {
  id: number;
  email: string;
  course: string;
  progress: number;
  joined: string;
  status: 'Hoạt động' | 'Chờ duyệt' | 'Tạm khóa';
  isVip?: boolean;
  lastLogin?: string;
  examsCompleted?: number;
  averageScore?: number;
}

export interface Course {
  key: string;
  name: string;
  tag: string;
  accentColor: string;
  subjectCount: number;
  examCount: number;
}

export interface CourseExam {
  id: number;
  title: string;
  courseKey: string;
  questions: number;
  duration: string;
  date: string;
  status: 'published' | 'draft';
}

export interface SubjectLecture {
  id: number;
  title: string;
  link: string;
}

export interface SubjectExercise {
  id: number;
  title: string;
  subject: string;
  questions: number;
  fileType: string;
  solutionLink?: string;
}

export interface SubjectTopic {
  id: number;
  name: string;
  lectures: SubjectLecture[];
  exercises: SubjectExercise[];
}
