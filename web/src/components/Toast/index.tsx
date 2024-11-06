import { useAppStore } from "@/store";
import { FC, useEffect } from "react";

const Toast: FC = () => {
  const { toast, setToast } = useAppStore();

  useEffect(() => {
    setTimeout(() => {
      setToast({ ...toast, show: false });
    }, 3000);
  }, [toast.show, setToast, toast]);

  if (!toast.show) {
    return null;
  }

  const handleClose = () => {
    setToast({ ...toast, show: false });
  };

  return (
    <div
      className={`fixed top-20 right-4 p-4 rounded shadow-lg text-white ${
        toast.type === "error"
          ? "bg-red-500"
          : toast.type === "success"
          ? "bg-green-500"
          : "bg-blue-500"
      }`}
    >
      <div className="flex justify-between items-center">
        <span>{toast.message}</span>
        <button onClick={handleClose} className="ml-4">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toast;
