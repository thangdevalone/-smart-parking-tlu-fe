import { create } from 'zustand';
import { CardType } from '@/types/card';

interface CardTypeState {
  data: CardType[];
  setData: (data: CardType[]) => void;
  addCardType: (cardType: CardType) => void;
  removeCardType: (id: number) => void;
}

const useCardTypeStore = create<CardTypeState>((set) => ({
  data: [],
  setData: (data: CardType[]) => set({ data }),
  addCardType: (cardType: CardType) =>
    set((state) => ({ data: [...state.data, cardType] })),
  removeCardType: (id: number) =>
    set((state) => ({ data: state.data.filter((ct) => ct.id !== id) })),
}));

export default useCardTypeStore;
