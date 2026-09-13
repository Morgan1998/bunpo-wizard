import type { UserProfile } from './users';

export interface AuthResponse {
  message: string;
  user: UserProfile;
}
