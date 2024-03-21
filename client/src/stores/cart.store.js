import { create } from 'zustand';

export const useCartStore = create((set) => ({
  items: [],
  isCartLoading: true,
  totalPrice: 0,

  initState: (payload) =>
    set((state) => ({
      ...state,
      isCartLoading: false,
      ...payload,
    })),
  dispatch: (payload) => set((state) => ({ ...state, ...payload })),
}));
