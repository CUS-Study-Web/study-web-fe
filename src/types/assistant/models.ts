export interface AsstCourse {
  key: string;
  tag: string;
  accentColor: string;
  subjects: AsstSubject[];
}

export interface AsstSubject {
  name: string;
  topicCount: number;
  lectureCount: number;
  exerciseCount: number;
}

export interface AsstLecture {
  id: number;
  title: string;
  topic: string;
  link: string;
  uploadedAt: string;
}

export interface AsstExercise {
  id: number;
  title: string;
  topic: string;
  questions: number;
  fileType: string;
  uploadedAt: string;
}

export interface AsstCourseExam {
  id: number;
  title: string;
  course: string;
  questions: number;
  duration: string;
  date: string;
}

export interface AsstLesson {
  id: number;
  no: string;
  title: string;
  duration: string;
  type: string;
  status: string;
}

export interface AsstStatCard {
  label: string;
  value: string;
  delta: string;
  icon: string;
  color: string;
  bg: string;
}

export interface AsstActivity {
  type: string;
  text: string;
  time: string;
  icon: string;
}

export interface AsstDocument {
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

export interface AsstCourseForm {
  title: string;
  subject: string;
  level: string;
  desc: string;
  price: string;
  sessions: string;
  status: string;
}

export interface AsstLessonForm {
  title: string;
  type: string;
  file: string;
}
