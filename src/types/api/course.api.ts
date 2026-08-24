import type { SubjectSummaryResponse } from './subject.api';

export interface CourseSummaryResponse {
  id: string;
  title: string;
  subTitle: string;
  badgeTitle: string;
  description: string;
  imageUrl: string;
  status: 'DRAFT' | 'PUBLISH';
  subjectCount: number;
  examCount: number;
  learningProgress?: number;
}

export interface CourseDetailResponse {
  subjectCount: number;
  learningProgress: number;
  subjects: SubjectSummaryResponse[];
}

export interface CourseRequest {
  title?: string;
  subtitle?: string;
  badgeTitle?: string;
  description?: string;
  thumbnailImage?: File;
  status?: 'DRAFT' | 'PUBLISH';
}
