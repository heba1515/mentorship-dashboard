export interface transaction {
  _id: string;
  session?: {
    _id: string;
    title: string;
    mentor?: string;
    price?: number;
    description: string;
    duration: number;
    schedule_time: string;
    status: string;
    has_room: boolean;
    recordings: string[];
  };
  user: {
    _id: string;
    image: string;
    name: string;
    email: string;
    phone: string;
    title: string;
    about: string;
    skills: string[];
    confirmEmail: boolean;
    updatedAt: string;
  };
  price: number;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}
