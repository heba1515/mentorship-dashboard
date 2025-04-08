export interface session {
  _id: string;
  title: string;
  mentor: string;
  price: number;
  description: string;
  duration: number;
  schedule_time: string; 
  status: string;
  has_room: boolean;
  recordings: string[];
}
