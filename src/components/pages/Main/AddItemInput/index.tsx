import { useState } from "react";
import { colors } from "../../../../theme/colors";
import { TodoItem } from "../../../../types";

interface Props {
  onResetMode: () => void;
  onAddTodoItem: (item: Pick<TodoItem, "title">) => void;
}

export default function AddItemInput({ onResetMode, onAddTodoItem }: Props) {
  const [addInput, setAddInput] = useState<string>("");

  function handleCancelAddInput() {
    onResetMode();
    setAddInput("");
  }

  return (
    <div>
      <input
        type="text"
        value={addInput}
        onChange={(e) => setAddInput(e.target.value)}
        placeholder="이곳에 할일을 추가할 수 있어요  :)"
        style={{
          width: "100%",
          background: "none",
          border: "none",
          borderBottom: `1px solid ${colors.gray[1]}`,
          padding: "7px 0",
          fontWeight: "bold",
          fontSize: 16,
          color: colors.white,
        }}
      />
      <div style={{ height: 5 }} />
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <button
          style={{
            background: "none",
            border: `1px solid ${colors.primary}`,
            borderRadius: 10,
            padding: "5px 7px",
            color: colors.primary,
            fontWeight: "bold",
          }}
          onClick={handleCancelAddInput}
        >
          취소
        </button>
        <button
          style={{
            background: colors.primary,
            border: "none",
            borderRadius: 10,
            padding: "5px 7px",
            color: colors.dark,
            fontWeight: "bold",
          }}
          onClick={() => {
            onAddTodoItem({
              title: addInput,
            });
            handleCancelAddInput();
          }}
        >
          저장
        </button>
      </div>
    </div>
  );
}
