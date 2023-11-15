import { TodoItem as TodoItemType } from "../../../../types";
import TodoItem from "./TodoItem";

interface Props {
  items: TodoItemType[];
  onItemDone: (id: TodoItemType["id"]) => void;
  onRemoveItem: (id: TodoItemType["id"]) => void;
  onEditItem: (item: TodoItemType) => void;
}

export default function TodoItems({ items, onItemDone, ...restProps }: Props) {
  return (
    <>
      {items.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          onItemDone={onItemDone}
          {...restProps}
        />
      ))}
    </>
  );
}
