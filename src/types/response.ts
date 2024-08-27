import { Tokens, User } from '@/types/auth.ts';

export interface ErrorResponse {
  success: boolean;
  status: number;
  path: string;
  message: string;
  type: string;
}

export interface SuccessResponse<T> {
  path: string;
  message: string;
  status: number;
  data: T;
}

export interface LoginResponse {
  tokens: Tokens;
  user: User;
}
