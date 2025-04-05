export interface session {
  id: number;
  Title: string;
  Price: number;
  MentorName: string;
  Date: string;
  status: 'active' | 'pending';
  Duration: number;
}
