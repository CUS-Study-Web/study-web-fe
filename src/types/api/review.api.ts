import type { CourseSummaryResponse } from './course.api';

export interface ReviewResponse {
  id: string;
  studentName: string;
  courseId: string;
  timeText: string;
  comment: string;
  avatarUrl: string;
  course?: CourseSummaryResponse;
}

export interface ReviewRequest {
  studentName: string;
  courseId: string;
  timeText: string;
  comment: string;
  avatarImage?: File;
}
