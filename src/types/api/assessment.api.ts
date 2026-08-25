export interface AssessmentSummaryResponse {
  id: string;
  title: string;
  assessmentType: 'HOMEWORK' | 'EXAM';
  status: 'PENDING_UPLOAD' | 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  numQuestions: number;
  durationMin: number | null;
  maxScore: number | null;
  accessTier: 'PUBLIC' | 'VIP' | null;
  fileType: string;
  explanationUrl?: string | null;
  createdAt: string;
  totalTakes: number;
}

export interface AnswerKeyResponse {
  questionNumber: number;
  questionType: 'SINGLE_CHOICE';
  correctAnswer: string;
}

export interface AssessmentDetailResponse {
  id: string;
  title: string;
  assessmentType: 'HOMEWORK' | 'EXAM';
  status: 'PENDING_UPLOAD' | 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  numQuestions: number;
  durationMin: number | null;
  maxScore: number | null;
  accessTier: 'PUBLIC' | 'VIP' | null;
  fileType: string;
  fileUrl: string;
  explanationUrl: string | null;
  courseId: string;
  subjectId: string | null;
  courseName: string;
  subjectName: string | null;
  publishedAt: string | null;
  createdAt: string;
  answerKeys: AnswerKeyResponse[];
  totalTakes: number;
}

export interface AssessmentStartResponse {
  id: string;
  title: string;
  assessmentType: 'HOMEWORK' | 'EXAM';
  numQuestions: number;
  durationMin: number | null;
  fileType: 'PDF' | 'DOC' | 'DOCX' | 'XLS' | 'XLSX' | 'PPTX';
  fileUrl: string;
  explanationUrl?: string | null;
}

export interface StudentAnswerItem {
  questionNumber: number;
  selectedAnswer: string | null;
}

export interface AssessmentSubmitRequest {
  durationMin?: number;
  answers: StudentAnswerItem[];
}

export interface AnswerDetailResponse {
  questionNumber: number;
  selectedAnswer: string | null;
  correctAnswer: string;
}

export interface AssessmentSubmitResponse {
  attemptId: string;
  attemptNumber: number;
  numCorrect: number;
  numWrong: number;
  totalQuestions: number;
  score: number;
  completedAt: string;
  details: AnswerDetailResponse[];
  explanationUrl?: string | null;
}

export interface AssessmentAttemptResponse {
  id: string;
  attemptNumber: number;
  numCorrect: number;
  totalQuestions: number;
  score: number;
  durationMin: number;
  completedAt: string;
}
