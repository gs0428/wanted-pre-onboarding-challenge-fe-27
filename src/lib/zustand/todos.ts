import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface TodoState {
  todo: string | null;
  setTodo: (todo: string) => void;
}

export const useTodoStore = create<TodoState>()(
  devtools(
    persist(
      (set) => ({
        todo: null,
        setTodo: (todo) => set(() => ({ todo })),
      }),
      {
        name: "todo-storage",
      },
    ),
  ),
);
