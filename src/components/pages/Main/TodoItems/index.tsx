import { ItemMode, TodoItem as TodoItemType } from "../../../../types";
import TodoItem from "./TodoItem";

interface Props {
  items: TodoItemType[];
  itemMode: ItemMode;
  onItemDone: (id: TodoItemType["id"]) => void;
  onEditItemMode: (id: TodoItemType["id"]) => void;
  onResetItemMode: () => void;
  onRemoveItem: (id: TodoItemType["id"]) => void;
  onEditItem: (item: TodoItemType) => void;
}

export default function TodoItems({
  items,
  itemMode,
  onItemDone,
  ...restProps
}: Props) {
  return (
    <>
      {items.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          itemMode={itemMode}
          onItemDone={onItemDone}
          {...restProps}
        />
      ))}
    </>
  );
}
