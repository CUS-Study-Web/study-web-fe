export interface VipSubscriptionFormData {
  name: string;
  email: string;
  birth: string; // YYYY-MM-DD
  phone: string;
  evidence: File;
  note?: string;
}

export interface VipInfoResponse {
  tier: string;
  vipStartDate: string;
  vipEndDate: string;
  status: string;
  requestDate: string;
  note: string;
  evidenceUrl: string;
}
