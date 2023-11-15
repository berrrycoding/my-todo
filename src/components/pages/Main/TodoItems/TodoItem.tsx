import { useState } from "react";
import { FiCheck, FiTrash } from "react-icons/fi";
import { useRecoilState, useResetRecoilState } from "recoil";
import { colors } from "../../../../theme/colors";
import { TodoItem as TodoItemType } from "../../../../types";
import { itemModeAtom } from "../states/itemMode";

interface Props {
  item: TodoItemType;
  onItemDone: (id: TodoItemType["id"]) => void;
  onRemoveItem: (id: TodoItemType["id"]) => void;
  onEditItem: (item: TodoItemType) => void;
}

export default function TodoItem({
  item,
  onItemDone,
  onEditItem,
  onRemoveItem,
}: Props) {
  const [itemMode, setItemMode] = useRecoilState(itemModeAtom);

  const { type: modeType, id: editItemId } = itemMode;
  const { id, isDone, title } = item;
  const isEditMode = modeType === "edit" && editItemId === id;

  function handleEditItemMode() {
    setItemMode({
      type: "edit",
      id,
    });
  }

  return (
    <div
      key={id}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px 0",
      }}
    >
      {!isDone && !isEditMode && (
        <>
          <div style={{ color: colors.white }} onClick={handleEditItemMode}>
            {item.title}
          </div>
          <div onClick={() => onItemDone(item.id)}>
            <FiCheck color={colors.gray[1]} size={26} />
          </div>
        </>
      )}
      {!isDone && isEditMode && (
        <EditItemInput
          item={item}
          onRemoveItem={onRemoveItem}
          onEditItem={onEditItem}
        />
      )}
      {isDone && (
        <>
          <div
            style={{
              color: colors.gray[1],
              textDecoration: "line-through",
            }}
          >
            {title}
          </div>
          <div onClick={() => onItemDone(id)}>
            <FiCheck color={colors.primary} size={26} />
          </div>
        </>
      )}
    </div>
  );
}

function EditItemInput({
  item,
  onRemoveItem,
  onEditItem,
}: {
  item: TodoItemType;
  onRemoveItem: (id: TodoItemType["id"]) => void;
  onEditItem: (item: TodoItemType) => void;
}) {
  const resetItemMode = useResetRecoilState(itemModeAtom);
  const [editInput, setEditInput] = useState<string>(item.title);

  return (
    <div style={{ width: "100%" }}>
      <input
        type="text"
        value={editInput}
        onChange={(e) => setEditInput(e.target.value)}
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 5,
            alignItems: "center",
          }}
        >
          <button
            style={{
              background: "none",
              border: `1px solid ${colors.primary}`,
              borderRadius: 10,
              padding: "5px 7px",
              color: colors.primary,
              fontWeight: "bold",
            }}
            onClick={resetItemMode}
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
              onEditItem({
                ...item,
                title: editInput,
              });
            }}
          >
            저장
          </button>
        </div>
        <div
          onClick={() => onRemoveItem(item.id)}
          style={{
            border: `1px solid ${colors.gray[1]}}`,
            borderRadius: 10,
            width: 28,
            height: 25,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FiTrash color={colors.gray[1]} />
        </div>
      </div>
    </div>
  );
}
