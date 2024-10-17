import { AxiosError } from "axios";

export const errorStatus = (error: AxiosError) => {
  switch (error.response?.status) {
    case 400:
      return alert("로그인에 실패했어요.");
    case 401: {
      alert("토큰이 유효하지 않아요. 다시 로그인해주세요.");
      localStorage.removeItem("token");
      window.location.replace("/auth");
      return;
    }
    case 409:
      return alert("이미 존재하는 이메일이에요.");
    default:
      return alert("알 수 없는 오류가 발생했어요.");
  }
};
