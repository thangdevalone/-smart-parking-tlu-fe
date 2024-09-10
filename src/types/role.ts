export interface Role {
  id: number;
  name: string;
  description: any;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateRole{
  name: string;
  description?: string;
}