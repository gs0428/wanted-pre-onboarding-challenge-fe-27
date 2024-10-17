import { errorStatus } from "@/api/status";
import { createTodo, removeTodo, updateTodo } from "@/api/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTodoStore } from "../zustand/todos";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error: AxiosError) => {
      errorStatus(error);
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error: AxiosError) => {
      errorStatus(error);
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const { setTodo } = useTodoStore();

  return useMutation({
    mutationFn: removeTodo,
    onSuccess: () => {
      setTodo("");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },

    onError: (error: AxiosError) => {
      errorStatus(error);
    },
  });
};
