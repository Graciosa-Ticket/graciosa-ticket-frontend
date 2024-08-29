export interface FeedbackModel {
  code: string;
  user_code?: number;
  comment: string;
  created_at?: Date;
  is_done?: boolean;
}
