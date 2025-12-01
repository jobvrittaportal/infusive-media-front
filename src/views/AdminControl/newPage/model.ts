export interface Feature {
  featureId?: number;
  name: string;
  desc: string;
  state: 'create' | 'update' | 'remove';
}

export interface PageFormData {
  id?: number;
  name: string;
  label: string;
  url: string;
  desc: string;
  features?: Feature[];
}