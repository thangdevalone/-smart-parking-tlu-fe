import { create } from 'zustand';
import { Card } from '@/types/card.ts';

interface CardTypeState {
  data: Card;
  toggleSidebar: () => void;
}

const useCardStore = create<CardState>((set) => ()
