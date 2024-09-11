import { Card } from '@/types/card.ts';

export interface Bill {
  id: number;
  startDate: Date;
  endDate: Date;
  price: number;
  billStatus: string;
  card: Card;
  histories: History[];
  createdAt: Date;
  updatedAt: Date;
}

