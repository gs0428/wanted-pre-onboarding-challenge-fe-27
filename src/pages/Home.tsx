import InputTodo from "@/components/todos/InputTodo";
import { useGetTodos } from "@/lib/query/todos";
import { useState } from "react";
import Loading from "@/components/common/loading";
import { useDeleteTodo, useUpdateTodo } from "@/lib/mutation/todos";
import Todo from "@/components/todos/Todo";
import { TodoDTO } from "@/models/todos";
import { useTodoStore } from "@/lib/zustand/todos";

const Home = () => {
  const [edit, setEdit] = useState({
    editId: "",
    title: "",
    content: "",
  });

  const { data, isLoading } = useGetTodos();
  const { mutate: deleteMutate } = useDeleteTodo();
  const { mutate: updateMutate } = useUpdateTodo();

  const { todo: todoStore, setTodo: setTodoStore } = useTodoStore();

  const detail = data?.data.data.find((todo) => todo.id === todoStore) || {
    title: "Todo를 선택해주세요.",
    content: "Todo를 선택해주세요.",
  };
  const s = edit.editId === todoStore;

  const onClickDetail = (id: string) => {
    setTodoStore(id);
  };

  const onEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleEdit = (
    todo: TodoDTO,
    e?: React.MouseEvent<HTMLButtonElement>
  ) => {
    e?.stopPropagation();
    if (todo.id === edit.editId) {
      if (edit.title.trim() === "") {
        return alert("1글자 이상 입력해주세요.");
      }
      updateMutate({ id: todo.id, title: edit.title, content: edit.content });
      return setEdit({
        editId: "",
        title: "",
        content: "",
      });
    }
    setEdit({
      ...todo,
      editId: todo.id,
    });
  };

  return (
    <section className="h-full">
      <h1 className="sticky top-0 border-b border-black p-4 text-2xl font-bold bg-white">
        gs0428's Todo
      </h1>
      <div className="flex flex-col h-full px-4 py-6">
        <h2 className="text-xl font-semibold">할 일 추가</h2>
        <InputTodo />
        <hr className="mx-[-16px] border-black my-4" />
        <h2 className="text-xl font-semibold">목록</h2>
        <div className="flex flex-col py-2 gap-4 flex-3 overflow-y-auto">
          <Loading isLoading={isLoading}>
            {data?.data.data.length === 0 ? (
              <h3 className="h-full flex justify-center items-center text-lg text-gray-400">
                할 일이 없습니다.
              </h3>
            ) : (
              data?.data.data.map((todo) => (
                <Todo
                  {...todo}
                  key={todo.id}
                  readOnly={todo.id !== edit.editId}
                  value={edit.title}
                  onEdit={onEdit}
                  onClickDelete={deleteMutate}
                  onClickDetail={onClickDetail}
                  handleEdit={handleEdit}
                />
              ))
            )}
          </Loading>
        </div>
        <hr className="mx-[-16px] border-black my-4" />
        <div className="flex-2 space-y-4">
          <h2 className="text-xl font-semibold">
            상세 - {s ? edit.title : detail.title}
          </h2>
          <h3 className="text-lg">{detail.content || "추가 내용이 없어요."}</h3>
        </div>
      </div>
    </section>
  );
};

export default Home;
