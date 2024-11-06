import {
  AUTH_REGISTER_ERROR_MESSAGE,
  AUTH_REGISTER_SUCCESS_MESSAGE,
} from "@/messages/auth";
import { register } from "@/services/users";
import { useAppStore } from "@/store";
import { UserDTO } from "@/utils/user.dto";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

const useUserRegister = () => {
  const { setLoader, setToast } = useAppStore();

  const { mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: (data: z.infer<typeof UserDTO>) => register(data),
    onSuccess: () => {
      setLoader(false);
      setToast({
        show: true,
        type: "success",
        message: AUTH_REGISTER_SUCCESS_MESSAGE,
      });
    },
    onError: () => {
      setLoader(false);
      setToast({
        show: true,
        type: "error",
        message: AUTH_REGISTER_ERROR_MESSAGE,
      });
    },
  });

  return { mutate };
};

export { useUserRegister };
