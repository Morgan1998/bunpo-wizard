export interface PublicUser {
  id: string;
  username: string;
}

export interface UserProfile extends PublicUser {
  email: string;
  createdAt: string | Date;
}

export interface SearchUsersResponse {
  users: PublicUser[];
}
