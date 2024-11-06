import { StateCreator } from "zustand";

type Type = "error" | "success" | "info";

interface Toast {
  show: boolean;
  message?: string;
  type?: Type;
  count?: number;
}

export interface ToastStore {
  toast: Toast;
  setToast: (payload: Toast) => void;
}

export const toast: StateCreator<ToastStore> = (set) => ({
  toast: {
    show: false,
    count: 0,
  },
  setToast: (payload) => {
    set((state) => {
      if (!payload.count) {
        let currentCount = state.toast?.count ?? 0;
        const count = currentCount++;
        return { toast: { ...payload, count } };
      }
      return { toast: { ...payload } };
    });
  },
});
