export interface notification {
  _id: string;
  user: string;
  message: string;
  type: 'comment' | 'like' | 'booking' | 'message';
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}
