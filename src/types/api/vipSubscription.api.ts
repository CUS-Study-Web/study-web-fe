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

export interface VipFormContentResponse {
  id: string;
  formTitle: string;
  description: string;
  hotline: string;
  fanpageLink: string;
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  transferContent: string;
  accountHolderQrUrl: string;
  updatedBy: string;
  updatedAt: string;
}
