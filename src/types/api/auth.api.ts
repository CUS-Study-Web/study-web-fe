export interface UserResponse {
  id: string;
  gmail: string;
  name: string;
  phone: string;
  birth: string; // YYYY-MM-DD
  gender: 'MALE' | 'FEMALE';
  school: string;
  avatarUrl?: string;
  role?: 'ADMIN' | 'LEARNER' | 'ASSISTANT';
  tier?: 'VIP' | 'NORMAL';
  status?: 'ACTIVE' | 'INACTIVE' | 'BANNED';
  vipStartDate?: string;
  vipEndDate?: string;
  joinDate?: string;
  lastLogin?: string;
}

export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  birth?: string; // YYYY-MM-DD
  gender?: 'MALE' | 'FEMALE' | '';
  school?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserResponse;
}

export interface LoginRequest {
  gmail: string;
  password?: string;
}

export interface RegisterRequest {
  gmail: string;
  name: string;
  phone: string;
  birth: string; // YYYY-MM-DD
  gender: 'MALE' | 'FEMALE';
  school: string;
  password?: string;
}

export interface ForgetPasswordRequest {
  gmail: string;
}

export interface ResetPasswordRequest {
  gmail: string;
  otpCode: string;
  newPassword?: string;
}

export interface ChangePasswordRequest {
  newPassword?: string;
}
