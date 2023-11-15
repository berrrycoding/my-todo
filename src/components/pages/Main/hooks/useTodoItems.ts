import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { API } from "../../../../apis";
import { TodoItem } from "../../../../types";
import { getDateString } from "../../../../utils/date";
import { currentDateAtom } from "../states/currentDate";

export function useTodoItems() {
  const currentDate = useRecoilValue(currentDateAtom);
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

  useEffect(() => {
    const result = API["/getItems"](getDateString(currentDate));
    setTodoItems(result.data.items);
  }, [currentDate]);

  function handleDoneItem(id: string) {
    const result = API["/doneItems"](id);

    if (result.success === false) {
      throw new Error("Internal Error");
    }

    const newItem = result.data.newItem as TodoItem;

    const index = todoItems.findIndex((item) => item.id === id);

    if (index <= -1) {
      throw new Error("Internal Error");
    }

    setTodoItems([
      ...todoItems.slice(0, index),
      newItem,
      ...todoItems.slice(index + 1),
    ]);
  }

  function handleAddItem(newItem: Pick<TodoItem, "title">) {
    const result = API["/addTodoItem"]({
      ...newItem,
      currentDate: getDateString(currentDate),
    });

    if (result.success === false) {
      throw new Error("Internal Error");
    }
    setTodoItems([...todoItems, result.data.item]);
  }

  function handleEditItem(newInput: TodoItem) {
    const result = API["/editTitle"]({
      title: newInput.title,
      id: newInput.id,
    });

    if (result.success === false) {
      throw new Error("Internal Error");
    }

    const index = todoItems.findIndex((item) => item.id === newInput.id);
    setTodoItems([
      ...todoItems.slice(0, index),
      newInput,
      ...todoItems.slice(index + 1),
    ]);
  }

  function handleRemoveItem(id: TodoItem["id"]) {
    const isConfirm = window.confirm("정말 삭제하시겠습니까?");

    if (isConfirm) {
      const result = API["/removeItem"](id);

      if (!result.success) {
        throw new Error("Internal Error");
      }

      setTodoItems(todoItems.filter((item) => item.id !== result.data.id));
    }
  }

  return {
    todoItems,
    onDoneItem: handleDoneItem,
    onAddItem: handleAddItem,
    onEditItem: handleEditItem,
    onRemoveItem: handleRemoveItem,
  };
}
