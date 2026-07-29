import { Field } from './field';

export interface Form {
  id: string;
  title: string;
  description?: string;
  logo:String;
  coverImage:String;
  fields: Field[];
  theme: 'light' | 'dark' | 'custom';
  showProgressBar: boolean;
  allowMultipleSubmissions: boolean;
  successMessage: string;
  redirectUrl?: string;
  notifyEmail?: string;
  createdAt: number;
  updatedAt: number;
  published: boolean;
}