import { errorStatus } from "@/api/status";
import { createUser, loginUser } from "@/api/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const useCreateUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createUser,
    onSuccess: (res) => {
      const { token } = res.data;
      localStorage.setItem("token", token);
      navigate(-1);
    },
    onError: (error: AxiosError) => {
      errorStatus(error);
    },
  });
};

export const useLoginUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      const { token } = res.data;
      localStorage.setItem("token", token);
      navigate("/todos");
    },
    onError: (error: AxiosError) => {
      errorStatus(error);
    },
  });
};
