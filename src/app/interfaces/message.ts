import { admin } from "./admin";

export interface message {
  _id?: string;
  sender: admin;
  sender_role: string;
  receiver: string;
  content: string;
  room?: string;
  createdAt?: string;
}
