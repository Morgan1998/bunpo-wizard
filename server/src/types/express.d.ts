import type { any } from 'zod';

export interface AuthUser {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      valid?: {
        body?: any;
        query?: any;
        params?: any;
      };
    }
  }
}
