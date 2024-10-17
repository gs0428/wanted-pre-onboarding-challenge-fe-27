import type { User } from "@/types/user";
import { http } from "./http";
import { ResponseDTO } from "@/models";
import { UserDTO } from "@/models/user";

export const createUser = async (data: User): Promise<ResponseDTO<UserDTO>> => {
  return await http.post("/users/create", data);
};
