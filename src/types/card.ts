import { User } from '@/types/auth.ts';

export interface Card {
  id: number;
  cardCode: string;
  licensePlate?: string;
  cardStatus: CardStatus;
  user: User;
  cardType: CardType;
  createdAt: Date;
  updatedAt: Date;
}

export interface CardType {
  id: number;
  cardTypeName: string;
  idCard: string;
  cardTypePrice: number;
  cards: Card[];
  createdAt: Date;
  updatedAt: Date;
}

export enum CardStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

