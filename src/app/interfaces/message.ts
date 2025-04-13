export interface message {
  sender: Object;
  sender_role: string;
  room?: string;
  receiver: string;
  content: string;
  createdAt?: string;
}
