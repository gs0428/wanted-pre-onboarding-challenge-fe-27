import Edit from "@/assets/icons/edit.svg";
import Delete from "@/assets/icons/delete.svg";
import Complete from "@/assets/icons/complete.svg";
import useOutsideClick from "@/hooks/use-outside-click";

interface TodoProps {
  id: string;
  title: string;
  content: string;
  readOnly: boolean;
  value: string;
  onEdit: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickDelete: (id: string) => void;
  onClickDetail: (id: string) => void;
  handleEdit: (
    { id, title, content }: { id: string; title: string; content: string },
    e?: React.MouseEvent<HTMLButtonElement>,
  ) => void;
}

const Todo = ({
  id,
  title,
  content,
  readOnly,
  value,
  onEdit,
  onClickDelete,
  onClickDetail,
  handleEdit,
}: TodoProps) => {
  const Svg = readOnly ? Edit : Complete;
  const [editRef] = useOutsideClick<HTMLDivElement>(
    () => !readOnly && handleEdit({ id, title, content }),
  );
  return (
    <div className="flex justify-between" ref={editRef}>
      <input
        className={`font-medium outline-none py-2 px-4 mr-2 flex-1 text-start cursor-pointer ${
          !readOnly && "border border-black rounded-lg cursor-default"
        }`}
        type={readOnly ? "button" : "text"}
        value={readOnly ? title : value}
        onClick={() => readOnly && onClickDetail(id)}
        onChange={onEdit}
        readOnly={readOnly}
        placeholder="할 일을 입력해주세요."
      />
      <div className="flex gap-2">
        <button onClick={(e) => handleEdit({ id, title, content }, e)}>
          <Svg />
        </button>
        <button
          onClick={() =>
            readOnly
              ? onClickDelete(id)
              : handleEdit({ id: "", title: "", content })
          }
        >
          <Delete />
        </button>
      </div>
    </div>
  );
};

export default Todo;
