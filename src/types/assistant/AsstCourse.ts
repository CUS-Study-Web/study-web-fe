import type { AsstSubject } from './AsstSubject';

export interface AsstCourse {
  key: string;
  tag: string;
  accentColor: string;
  subjects: AsstSubject[];
}
