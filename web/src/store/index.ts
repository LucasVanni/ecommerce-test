import { create } from "zustand";

import { loader, LoaderStore } from "./loader";
import { toast, ToastStore } from "./toast";
import { user, UserStore } from "./user";

type StoreState = ToastStore & LoaderStore & UserStore;

export const useAppStore = create<StoreState>()((...a) => ({
  ...toast(...a),
  ...user(...a),
  ...loader(...a),
}));
