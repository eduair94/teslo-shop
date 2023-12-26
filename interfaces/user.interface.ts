export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date | null;
  role: string;
  image?: string | null;
}
