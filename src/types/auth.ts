import { Role } from './role';

export interface LoginForm {
  userCode: string;
  password: string;
}


export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface User {
  id?: number;
  fullName: string;
  phone?: string;
  email: string;
  userCode: string;
  createdAt?: string;
  updatedAt?: string;
  role: Role;
}


export enum RoleInApp {
  ADMIN = 'admin',
  GUARD = 'guard',
  USER = 'user'
}

