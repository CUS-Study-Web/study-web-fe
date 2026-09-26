export type SubmitGuestRegisterFormRequest = {
  name: string;
  phoneNumber: string;
  email: string;
  subject?: string;
  note?: string;
  registeredDate?: string;
};

export type SubmitGuestRegisterFormResponse = {
  statusCode: number;
  message: string;
  data: {
    id: string;
    name: string;
    phoneNumer: string;
    email: string;
    subject: string;
    note: string;
    registeredDate: string;
    createdAt: string;
  };
};

export interface RegisterFormResponse {
  id: string;
  name: string;
  phoneNumber: string;
  phoneNumer?: string;
  email: string;
  subject: string;
  note: string;
  registeredDate: string;
  createdAt: string;
}

export interface GetRegisterFormsParams {
  date?: string;
  search?: string;
  page?: number;
  size?: number;
  sort?: string;
}
