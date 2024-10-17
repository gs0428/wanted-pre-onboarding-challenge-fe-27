import { ResponseDTO } from "@/models";
import { http } from "./http";
import type { TodoDTO } from "@/models/todos";
import type { Todo } from "@/types/todos";

export const getTodos = async (): Promise<
  ResponseDTO<Record<"data", TodoDTO[]>>
> => {
  return await http.get("/todos");
};

export const createTodo = async (data: Todo): Promise<ResponseDTO<TodoDTO>> => {
  return await http.post("/todos", data);
};

export const updateTodo = async (
  data: TodoDTO,
): Promise<ResponseDTO<TodoDTO>> => {
  return await http.put(`/todos/${data.id}`, data);
};

export const removeTodo = async (id: string) => {
  return await http.delete(`/todos/${id}`);
};
