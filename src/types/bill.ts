import { User } from '@/types/auth.ts';

export interface Bill {
  id: number;
  startDate: string;
  endDate: string;
  price: number;
  user: {
    id: number;
    fullName: string;
  };
  createdAt: string;
  updatedAt: string;
}


export interface Transaction {
  id: number;
  createdAt?: string;
  updatedAt?: string;
  user: User;
  amount: number;
  bankCode: string;
  bankTranNo?: string | null;
  orderInfo: string;
  cardType?: string | null;
  payDate: string;
  txnRef: string;
  transactionNo?: string | null;
  status: PaymentStatus;
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}