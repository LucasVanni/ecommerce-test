import {
  AUTH_LOAD_ERROR_MESSAGE,
  AUTH_LOGIN_ERROR_MESSAGE,
  AUTH_LOGIN_SUCCESS_MESSAGE,
  AUTH_RECOVERY_PASSWORD_ERROR_MESSAGE,
  AUTH_RECOVERY_PASSWORD_SUCCESS_MESSAGE,
  AUTH_RECOVERY_PASSWORD_TOKEN_ERROR_MESSAGE,
  AUTH_RECOVERY_PASSWORD_TOKEN_SUCCESS_MESSAGE,
} from "@/messages/auth";
import {
  getUserInfo,
  login,
  recoveryPassword,
  recoveryPasswordToken,
} from "@/services/auth";
import { useAppStore } from "@/store";
import { UserInterface } from "@/utils/user.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

const useAuth = (email: string) => {
  const { setLoader, setToast, setUser } = useAppStore();

  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserInfo(email),
    enabled: !!email,
    onSuccess: (data) => {
      setLoader(false);
      setUser(data);
    },
    onError: () => {
      setUser(null);
      setLoader(false);
      setToast({
        show: true,
        type: "error",
        message: AUTH_LOAD_ERROR_MESSAGE,
      });
    },
  });

  return { user, error, isLoading };
};

const useLogin = () => {
  const { setLoader, setToast, setUser } = useAppStore();

  const { mutate, isSuccess } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: { email: string; password: string }) => login(data),
    onSuccess: (data) => {
      setLoader(false);
      setToast({
        show: true,
        type: "success",
        message: AUTH_LOGIN_SUCCESS_MESSAGE,
      });

      localStorage.setItem("access_token", data.access_token);

      const { email, name } = jwtDecode(data.access_token) as UserInterface;

      setUser({ email, name });
    },
    onError: () => {
      setLoader(false);
      setToast({
        show: true,
        type: "error",
        message: AUTH_LOGIN_ERROR_MESSAGE,
      });
    },
  });

  return { mutate, isSuccess };
};

const useRecoveryPassword = () => {
  const { setLoader, setToast } = useAppStore();

  const { mutate } = useMutation({
    mutationKey: ["recovery-password"],
    mutationFn: (data: { email: string; recoveryLink: string }) =>
      recoveryPassword(data),
    onSuccess: () => {
      setLoader(false);
      setToast({
        show: true,
        type: "success",
        message: AUTH_RECOVERY_PASSWORD_SUCCESS_MESSAGE,
      });
    },
    onError: () => {
      setLoader(false);
      setToast({
        show: true,
        type: "error",
        message: AUTH_RECOVERY_PASSWORD_ERROR_MESSAGE,
      });
    },
  });

  return { mutate };
};

const useRecoveryPasswordToken = () => {
  const { setLoader, setToast } = useAppStore();

  const { mutate } = useMutation({
    mutationKey: ["recovery-password-token"],
    mutationFn: (data: {
      token: string;
      password: string;
      confirmPassword: string;
    }) => recoveryPasswordToken(data),
    onSuccess: () => {
      setLoader(false);
      setToast({
        show: true,
        type: "success",
        message: AUTH_RECOVERY_PASSWORD_TOKEN_SUCCESS_MESSAGE,
      });
    },
    onError: () => {
      setLoader(false);
      setToast({
        show: true,
        type: "error",
        message: AUTH_RECOVERY_PASSWORD_TOKEN_ERROR_MESSAGE,
      });
    },
  });

  return { mutate };
};

export { useAuth, useLogin, useRecoveryPassword, useRecoveryPasswordToken };
