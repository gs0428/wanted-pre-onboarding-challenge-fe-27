import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface TodoState {
  todo: string;
  setTodo: (todo: string) => void;
}

export const useTodoStore = create<TodoState>()(
  devtools(
    persist(
      (set) => ({
        todo: "",
        setTodo: (todo) => set(() => ({ todo })),
      }),
      {
        name: "todo-storage",
      },
    ),
  ),
);
