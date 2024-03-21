import { create } from 'zustand';

export const useItemsStore = create((set) => ({
  items: [],
  areItemsLoading: true,

  initState: (payload) =>
    set((state) => ({
      ...state,
      areItemsLoading: false,
      ...payload,
    })),
  dispatch: (payload) =>
    set((state) => ({ ...state, areItemsLoading: false, ...payload })),

  addItem: (item) =>
    set((state) => ({ ...state, items: [...state.items, item] })),
  removeItem: (id) =>
    set((state) => ({
      ...state,
      items: state.items.filter((item) => item.id !== id),
    })),
}));
