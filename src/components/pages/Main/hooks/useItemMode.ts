import { useState } from "react";
import { ItemMode, TodoItem } from "../../../../types";

export function useItemMode() {
  const [itemMode, setItemMode] = useState<ItemMode>({ type: "default" });

  function handleAddItemMode() {
    setItemMode({ type: "add" });
  }

  function handleEditItemMode(id: TodoItem["id"]) {
    setItemMode({
      type: "edit",
      id,
    });
  }

  function handleResetItemMode() {
    setItemMode({
      type: "default",
    });
  }

  return {
    itemMode,
    onAddItemMode: handleAddItemMode,
    onEditItemMode: handleEditItemMode,
    onResetItemMode: handleResetItemMode,
  };
}
