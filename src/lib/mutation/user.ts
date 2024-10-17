import { createUser } from "@/api/user";
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
      if (error.response?.status === 409) {
        return alert("이미 존재하는 이메일입니다.");
      }
      alert("알 수 없는 오류가 발생했습니다.");
    },
  });
};
