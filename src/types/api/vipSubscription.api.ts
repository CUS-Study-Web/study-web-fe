export interface VipSubscriptionFormData {
  name: string;
  email: string;
  birth: string; // YYYY-MM-DD
  phone: string;
  evidence: File;
  note?: string;
}
