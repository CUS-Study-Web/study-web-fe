export interface SubjectSummaryResponse {
  id: string;
  name: string;
  durationHours: number;
  lessonCount: number;
}

export interface SubjectRequest {
  title: string;
  maxScores: number;
  durationHour: number;
}
