export interface FormResponse {
  id: string;
  formId: string;
  data: Record<string, any>;
  submittedAt: number;
  ipAddress?: string;
  userAgent?: string;
}