import type { CreateUserDTO } from "@/types/user";
import { http } from "./http";
import { ResponseDTO } from "@/models";
import { User } from "@/models/user";

export const createUser = async (
  data: CreateUserDTO
): Promise<ResponseDTO<User>> => {
  return await http.post("/users/create", data);
};
