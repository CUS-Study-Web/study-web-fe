export interface LessonCardResponse {
  id: string;
  title: string;
  orderNum: number;
  durationMin: number;
  youtubeUrl: string;
  isClicked: boolean;
  isVip: boolean;
}

export interface LessonListResponse {
  lessonCount: number;
  lessons: LessonCardResponse[];
}

export interface LessonRequest {
  title: string;
  orderNum?: number;
  youtubeUrl?: string;
  durationMin?: number;
  access?: 'PUBLIC' | 'VIP';
}
