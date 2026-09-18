import type { CtaTarget, FooterCategory } from './websiteManagement.api';

export interface HomepageContentResponse {
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
}

export interface FooterLinkItemResponse {
  label: string;
  url: string;
  sortOrder: number;
  category: FooterCategory;
}

export interface FooterContentResponse {
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
  links: FooterLinkItemResponse[];
}
