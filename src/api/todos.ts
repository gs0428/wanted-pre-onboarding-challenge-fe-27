import { ResponseDTO } from "@/models";
import { http } from "./http";
import { TodoDTO } from "@/models/todos";

export const getTodos = async (): Promise<
  ResponseDTO<Record<"data", TodoDTO[]>>
> => {
  return await http.get("/todos");
};
