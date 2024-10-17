import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
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
import { useCreateTodo } from "@/lib/mutation/todos";

const InputTodo = () => {
  const { mutate, isSuccess } = useCreateTodo();
  const formSchema = z.object({
    title: z.string().min(0, {
      message: "1글자 이상 입력해주세요.",
    }),
    content: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
    if (isSuccess) {
      form.resetField("title");
      form.resetField("content");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>할 일</FormLabel>
                <FormControl>
                  <Input
                    id="title"
                    placeholder="할 일을 입력해주세요."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>추가 내용</FormLabel>
                <FormControl>
                  <Input
                    id="content"
                    type="content"
                    placeholder="(선택) 추가 내용을 입력해주세요."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="self-end">
          추가하기
        </Button>
      </form>
    </Form>
  );
};

export default InputTodo;
