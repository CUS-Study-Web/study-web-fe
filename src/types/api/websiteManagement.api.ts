export type CtaTarget = 'REGISTER' | 'COURSES' | 'LOGIN' | 'ABOUT';

export type FooterCategory = 'PROGRAM' | 'ABOUT';

export interface HomepageResponse {
  id: string;
  badgeTitle: string | null;
  headline1: string | null;
  headline2: string | null;
  description: string | null;
  ctaBtn1Name: string | null;
  ctaBtn1Target: CtaTarget | null;
  ctaBtn2Name: string | null;
  ctaBtn2Target: CtaTarget | null;
  mainImageUrl: string | null;
  stat1Number: string | null;
  stat1Desc: string | null;
  stat2Number: string | null;
  stat2Desc: string | null;
  student1Avatar: string | null;
  student2Avatar: string | null;
  student3Avatar: string | null;
  studentStatsDesc: string | null;
  updatedByEmail: string | null;
  updatedAt: string | null;
}

export interface FooterLinkResponse {
  id: string;
  label: string;
  url: string;
  sortOrder: number;
  category: FooterCategory;
}

export interface FooterResponse {
  id: string;
  companyName: string | null;
  address: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  youtubeUrl: string | null;
  tiktokUrl: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  workingHours: string | null;
  copyrightText: string | null;
  privacyUrl: string | null;
  termsUrl: string | null;
  links: FooterLinkResponse[];
  updatedByEmail: string | null;
  updatedAt: string | null;
}

export interface FooterLinkItemRequest {
  id?: string;
  label: string;
  url: string;
  sortOrder?: number;
  category?: FooterCategory;
}

export interface UpdateFooterRequest {
  companyName?: string;
  address?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;
  phone?: string;
  email?: string;
  website?: string;
  workingHours?: string;
  copyrightText?: string;
  privacyUrl?: string;
  termsUrl?: string;
  links?: FooterLinkItemRequest[];
}
