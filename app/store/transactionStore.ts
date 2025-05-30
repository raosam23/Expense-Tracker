import { create } from "zustand";
import { TransactionType } from "../types/TransactionType";

interface TransactionStore {
  transactions: TransactionType[];
  setTransactions: (
    updater:
      | TransactionType[]
      | ((prev: TransactionType[]) => TransactionType[]),
  ) => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  setTransactions: (updater) => {
    set((state) => ({
      transactions:
        typeof updater === "function" ? updater(state.transactions) : updater,
    }));
  },
}));
