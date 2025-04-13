import { Role } from './role';

export interface Account {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  isVerified: boolean;
  jwtToken?: string;
  refreshToken?: string;
}
