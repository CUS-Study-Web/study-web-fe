export type FeatureIconAccess = 'CHECKED' | 'UNCHECKED' | 'NON_EXIST';

export interface VipFeatureRequest {
  featureName: string;
  iconNormalAccess: FeatureIconAccess;
  normalAccess: string;
  iconVipAccess: FeatureIconAccess;
  vipAccess: string;
  normalHasIcon?: boolean;
  vipHasIcon?: boolean;
}

export interface VipFeatureResponse {
  id: string;
  featureName: string;
  iconNormalAccess: FeatureIconAccess;
  normalAccess: string;
  normalHasIcon: boolean;
  iconVipAccess: FeatureIconAccess;
  vipAccess: string;
  vipHasIcon: boolean;
}

export interface NormalPackageInfoRequest {
  name?: string;
  price?: string;
  description?: string;
  buttonText?: string;
}

export interface NormalPackageInfoResponse {
  name: string;
  price: string;
  description: string;
  buttonText: string;
}

export interface VipPackageInfoRequest {
  name?: string;
  price?: string;
  billingPeriod?: string;
  description?: string;
  buttonText?: string;
  tag?: string;
}

export interface VipPackageInfoResponse {
  name: string;
  price: string;
  billingPeriod: string;
  description: string;
  buttonText: string;
  tag: string;
}

export interface PricingPageUpdateRequest {
  normalPackage?: NormalPackageInfoRequest;
  vipPackage?: VipPackageInfoRequest;
}

export interface PricingPageResponse {
  id: string;
  normalPackage: NormalPackageInfoResponse;
  vipPackage: VipPackageInfoResponse;
  features: VipFeatureResponse[];
}
