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
  // Additional properties needed by fake backend
  password?: string;
  refreshTokens?: string[];
  dateCreated?: string;
  verificationToken?: string;
  resetToken?: string;
  resetTokenExpires?: string;
  confirmPassword?: string;
  isDeleting?: boolean;
}
