export interface LessonSummaryResponse {
  id: string;
  title: string;
  durationMin: number;
  youtubeUrl: string;
}

export interface LessonRequest {
  title: string;
  orderNum: number;
  youtubeUrl: string;
  durationMin: number;
  access: 'PUBLIC' | 'VIP';
}
