import { useResetRecoilState } from "recoil";
import { colors } from "../../../theme/colors";
import { TodoItem } from "../../../types";
import AddItemButton from "./AddItemButton";
import AddItemInput from "./AddItemInput";
import DateNavigation from "./DateNavigation";
import TodoItems from "./TodoItems";
import { useTodoItems } from "./hooks/useTodoItems";
import { itemModeAtom } from "./states/itemMode";

export default function Main() {
  return (
    <div
      style={{
        background: colors.dark,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflowY: "auto",
        scrollPaddingTop: 80,
      }}
    >
      <DateNavigation />
      <main
        style={{
          padding: 15,
          display: "flex",
          flexDirection: "column",
          gap: 15,
        }}
      >
        <Content />
      </main>
      <AddItemButton />
    </div>
  );
}

function Content() {
  const { todoItems, onDoneItem, onAddItem, onEditItem, onRemoveItem } =
    useTodoItems();
  const resetItemMode = useResetRecoilState(itemModeAtom);

  function handleEditItem(item: TodoItem) {
    onEditItem(item);
    resetItemMode();
  }

  return (
    <>
      <AddItemInput onAddTodoItem={onAddItem} />
      <TodoItems
        items={todoItems}
        onItemDone={onDoneItem}
        onRemoveItem={onRemoveItem}
        onEditItem={handleEditItem}
      />
    </>
  );
}
