import type { SubjectSummaryResponse } from './subject.api';

export interface CourseSummaryResponse {
  id: string;
  title: string;
  subTitle: string;
  badgeTitle: string;
  description: string;
  imageUrl: string;
}

export interface CourseDetailResponse {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  totalSubjects: number;
  learningProgress: number;
  subjects: SubjectSummaryResponse[];
}

export interface CourseRequest {
  title: string;
  subtitle: string;
  badgeTitle: string;
  description: string;
  thumbnailImage: File;
}
