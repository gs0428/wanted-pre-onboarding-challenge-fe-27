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
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import { useCreateUser } from "@/lib/mutation/user";

const Signup = () => {
  const { mutate } = useCreateUser();
  const formSchema = z
    .object({
      email: z.string().email({
        message: "이메일 형식이 올바르지 않습니다.",
      }),
      password: z.string().min(8, {
        message: "비밀번호를 8자 이상 입력해주세요.",
      }),
      passwordConfirm: z.string().min(8, {
        message: "비밀번호를 8자 이상 입력해주세요.",
      }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "비밀번호가 일치하지 않습니다.",
      path: ["passwordConfirm"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const disabled =
    form.formState.isSubmitting ||
    form.getValues().email.trim() === "" ||
    form.getValues().password.trim() === "" ||
    form.getValues().passwordConfirm.trim() === "";

  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { passwordConfirm, ...sendData } = values;
    mutate(sendData);
  };

  const onClickBack = () => {
    navigate(-1);
  };

  return (
    <Form {...form}>
      <button
        className="flex items-center p-4 sticky top-0 bg-white gap-2"
        onClick={onClickBack}
      >
        <ArrowLeft /> 뒤로가기
      </button>
      <section className="flex flex-col gap-16 h-full py-20 px-4">
        <h1 className="self-center text-4xl font-bold">회원가입</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
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
                      placeholder="이메일을 입력해주세요."
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
                      placeholder="비밀번호를 입력해주세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호 확인</FormLabel>
                  <FormControl>
                    <Input
                      id="passwordConfirm"
                      type="password"
                      placeholder="비밀번호를 한 번 더 입력해주세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full" disabled={disabled}>
            회원가입
          </Button>
        </form>
      </section>
    </Form>
  );
};

export default Signup;
