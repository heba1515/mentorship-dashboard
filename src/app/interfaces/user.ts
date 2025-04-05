export interface user {
  id: number;
  user: {
    name: string;
    image: string;
    title: string;
  };
  date: string;
  email: string;
  phone: number;
  status: 'active'  | 'pending';
}
