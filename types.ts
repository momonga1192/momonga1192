import React from 'react';

export interface NavItem {
  label: string;
  href: string;
  subItems?: NavItem[];
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface CompanyInfo {
  label: string;
  value: string;
}