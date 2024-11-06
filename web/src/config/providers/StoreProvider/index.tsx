"use client";

import Loader from "@/components/Loader";
import Notification from "@/components/Toast";
import { useAppStore } from "@/store";
import { FC } from "react";

const StoreProvider: FC = () => {
  const { toast, loader } = useAppStore();

  return (
    <>
      {toast.show ? <Notification /> : null}
      {loader.show ? <Loader type="page" /> : null}
    </>
  );
};

export default StoreProvider;
