export interface mentor {
  id: number;
  mentor: {
    name: string;
    image: string;
    title: string;
  };
  date: string;
  email: string;
  phone: number;
  status: 'active'  | 'pending';
  earnd: number;
}
