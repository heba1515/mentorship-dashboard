export interface admin {
  _id: string;
  image: string;
  name: string;
  email: string;
  password: string;
  confirmedPassword?: string;
  phone: string;
  confirmEmail: boolean;
  role: string;
  updatedAt: string;
  isSuperAdmin: boolean;
}
