export interface AssistantStatResponse {
  value: number;
  delta: number;
}

export interface AssistantActivityItemResponse {
  id: string;
  type: string;
  text: string;
  timestamp: string;
}

export interface AssistantDashboardResponse {
  totalLearners: AssistantStatResponse;
  totalExercises: AssistantStatResponse;
  totalExams: AssistantStatResponse;
  recentActivities: AssistantActivityItemResponse[];
}
