export interface AchievementScoreRequest {
  subjectId: string;
  score: number;
}

export interface AchievementScoreResponse {
  id: string;
  subjectId: string;
  subjectName: string;
  score: number;
}

export interface LeaderboardResponse {
  id: string;
  studentName: string;
  courseId: string;
  courseName: string;
  achievement: string;
  avatarUrl: string;
  sumScore: number;
  scores: AchievementScoreResponse[];
}

export interface LeaderboardRequest {
  studentName: string;
  courseId: string;
  achievement?: string;
  sumScore: number;
  avatarImage?: File;
}
