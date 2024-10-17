import Edit from "@/assets/icons/edit.svg";
import Delete from "@/assets/icons/delete.svg";
import InputTodo from "@/components/todos/InputTodo";
import { useGetTodos } from "@/lib/query/todos";
import { useState } from "react";
import Loading from "@/components/common/loading";

const Home = () => {
  const { data, isLoading } = useGetTodos();
  const [edit, setEdit] = useState({
    editId: "",
    value: "",
  });

  const onEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit({
      editId: edit.editId,
      value: e.target.value,
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
        <div className="flex flex-col py-2 gap-4 flex-3">
          <Loading isLoading={isLoading}>
            {data?.data.data.length === 0 ? (
              <h3 className="h-full flex justify-center items-center text-lg text-gray-400">
                할 일이 없습니다.
              </h3>
            ) : (
              data?.data.data.map((todo) => (
                <div className="flex justify-between">
                  <input
                    className="font-medium"
                    value={todo.title}
                    onChange={onEdit}
                    readOnly={todo.id !== edit.editId}
                  />
                  <div className="flex gap-2">
                    <button>
                      <Edit />
                    </button>
                    <button>
                      <Delete />
                    </button>
                  </div>
                </div>
              ))
            )}
          </Loading>
        </div>
        <hr className="mx-[-16px] border-black my-4" />
        <div className="flex-2">
          <h2 className="text-xl font-semibold">상세</h2>
        </div>
      </div>
    </section>
  );
};

export default Home;
