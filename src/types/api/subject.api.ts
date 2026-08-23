export interface SubjectSummaryResponse {
  id: string;
  name: string;
  durationHours: number;
  lessonCount: number;
  exerciseCount: number;
}

export interface SubjectRequest {
  title: string;
  maxScores: number;
  durationHour: number;
}
