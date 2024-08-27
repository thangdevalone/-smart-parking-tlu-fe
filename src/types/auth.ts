export interface LoginForm {
  email: string;
  password: string;
}


export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface User {
  id: number;
  fullName: string;
  phone: any;
  email: string;
  userCode: string;
  createdAt: string;
  updatedAt: string;
  role: Role;
}

export interface Role {
  id: number;
  name: string;
  description: any;
  createdAt: string;
  updatedAt: string;
}

export enum RoleInApp {
  ADMIN = 'admin',
  GUARD = 'guard',
  USER = 'user'
}

