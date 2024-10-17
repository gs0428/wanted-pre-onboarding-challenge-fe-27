import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const Home = () => {
  const formSchema = z.object({
    email: z.string().email({
      message: "이메일 형식이 올바르지 않습니다.",
    }),
    password: z.string().min(8, {
      message: "비밀번호를 8자 이상 입력해주세요.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const onClickSignup = () => {
    navigate("/auth/signup");
  };

  return (
    <Form {...form}>
      <section className="flex flex-col gap-16 h-full py-20 px-4">
        <h1 className="self-center text-4xl">PreOnboarding Todo</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="이메일을 입력하세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="비밀번호를 입력하세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2">
            <Button className="flex-1" type="submit">
              로그인
            </Button>
            <Button
              className="flex-1"
              variant="outline"
              onClick={onClickSignup}
            >
              회원가입
            </Button>
          </div>
        </form>
      </section>
    </Form>
  );
};

export default Home;
