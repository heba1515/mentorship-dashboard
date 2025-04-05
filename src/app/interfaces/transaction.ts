export interface transaction {
  id: string;
  userId:number;
  userImage: string;
  userName: string;
  totalAmount: number;
  status: 'paid'  | 'unpaid';
}
