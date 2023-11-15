import { colors } from "../../../theme/colors";
import { DateObject, ItemMode, TodoItem } from "../../../types";
import AddItemButton from "./AddItemButton";
import AddItemInput from "./AddItemInput";
import DateNavigation from "./DateNavigation";
import TodoItems from "./TodoItems";
import { useCurrentDate } from "./hooks/useCurrentDate";
import { useItemMode } from "./hooks/useItemMode";
import { useTodoItems } from "./hooks/useTodoItems";

export default function Main() {
  const { currentDate, onMovePreviousMonth, onMoveNextMonth } =
    useCurrentDate();
  const { itemMode, onAddItemMode, onEditItemMode, onResetItemMode } =
    useItemMode();

  return (
    <div style={{ background: colors.dark, height: "100vh" }}>
      <DateNavigation
        currentDate={currentDate}
        onMovePreviousMonth={onMovePreviousMonth}
        onMoveNextMonth={onMoveNextMonth}
      />
      <main
        style={{
          padding: 15,
          display: "flex",
          flexDirection: "column",
          gap: 15,
        }}
      >
        <Content
          currentDate={currentDate}
          itemMode={itemMode}
          onEditItemMode={onEditItemMode}
          onResetItemMode={onResetItemMode}
        />
      </main>
      <AddItemButton onAddMode={onAddItemMode} />
    </div>
  );
}

function Content({
  currentDate,
  itemMode,
  onEditItemMode,
  onResetItemMode,
}: {
  currentDate: DateObject;
  itemMode: ItemMode;
  onEditItemMode: (id: TodoItem["id"]) => void;
  onResetItemMode: () => void;
}) {
  const { todoItems, onDoneItem, onAddItem, onEditItem, onRemoveItem } =
    useTodoItems({ currentDate });

  function handleEditItem(item: TodoItem) {
    onEditItem(item);
    onResetItemMode();
  }

  return (
    <>
      {itemMode.type === "add" && (
        <AddItemInput onResetMode={onResetItemMode} onAddTodoItem={onAddItem} />
      )}
      <TodoItems
        items={todoItems}
        itemMode={itemMode}
        onItemDone={onDoneItem}
        onEditItemMode={onEditItemMode}
        onResetItemMode={onResetItemMode}
        onRemoveItem={onRemoveItem}
        onEditItem={handleEditItem}
      />
    </>
  );
}
