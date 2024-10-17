import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser({
      ...user,
      [id]: value,
    });
  };

  const onSubmit = () => {
    alert("로그인 버튼 클릭");
  };

  const onClickSignup = () => {
    navigate("/auth/signup");
  };
  return (
    <section className="flex flex-col gap-16 h-full py-20">
      <h1 className="self-center text-4xl">PreOnboarding Todo</h1>
      <form className="flex flex-col gap-10 px-4" onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            placeholder="이메일을 입력하세요."
            value={user.email}
            onChange={onChange}
          />
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={user.password}
            onChange={onChange}
          />
        </div>
        <div className="flex gap-2">
          <Button className="flex-1" onClick={onSubmit}>
            로그인
          </Button>
          <Button className="flex-1" variant="outline" onClick={onClickSignup}>
            회원가입
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Home;
