export interface LessonSummaryResponse {
  id: string;
  title: string;
  orderNum: number;
  durationMin: number;
  youtubeUrl: string;
}

export interface LessonListResponse {
  lessonCount: number;
  lessons: LessonSummaryResponse[];
}

export interface LessonRequest {
  title: string;
  orderNum: number;
  youtubeUrl: string;
  durationMin: number;
  access: 'PUBLIC' | 'VIP';
}
