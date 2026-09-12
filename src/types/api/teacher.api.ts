export interface TeacherProfileResponse {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
  subject: string;
}

export interface TeacherProfileRequest {
  name: string;
  description: string;
  subject: string;
  avatarImage?: File;
}
