export enum AppTab {
  MEMBERSHIP = 'MEMBERSHIP',
  MARKETING = 'MARKETING',
  DISTRIBUTION = 'DISTRIBUTION'
}

export interface Coupon {
  id: string;
  title: string;
  value: string;
  type: 'discount' | 'cash' | 'product';
  desc: string;
}

export interface DistributionNode {
  id: string;
  name: string;
  role: 'Big Leader' | 'Small Leader' | 'Member';
  sales: number;
  children?: DistributionNode[];
}

export interface BenefitStatus {
  step: number; // 0: Claimed, 1: Shipped, 2: Delivered, 3: Verified
  itemName: string;
}