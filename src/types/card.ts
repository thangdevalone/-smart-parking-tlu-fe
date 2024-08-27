import { User } from '@/types/auth.ts';
import { Bill } from '@/types/bill.ts';

export interface Card {
  id: number;
  cardCode: string;
  licensePlate?: string;
  cardStatus: CardStatus;
  user: User;
  cardType: CardType;
  bills: Bill[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CardType {
  id: number;
  cardTypeName: string;
  cardTypePrice: number;
  cards: Card[];
  createdAt: Date;
  updatedAt: Date;
}

export enum CardStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
