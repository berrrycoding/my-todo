import { useEffect, useState } from "react";
import { FiCheck, FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";

type TodoItem = {
  id: string;
  title: string;
  isDone: boolean;
  index: number;
  createdAt: string; // yyyy-mm-dd 문자열로 저장
};

type DateObject = {
  year: number;
  month: number;
  date: number;
};

function extractDateObject(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dateOfMonth = date.getDate();

  return { year, month, date: dateOfMonth } as DateObject;
}

function getDateString(dateObject: DateObject) {
  return `${dateObject.year}-${dateObject.month}-${dateObject.date}`;
}

function shiftDateBy(date: DateObject, diff: number) {
  const newDate = new Date(date.year, date.month - 1, date.date);
  newDate.setDate(newDate.getDate() + diff);
  return newDate;
}

const API = {
  "/getItems": (currentDate: string) => {
    const todoItemsFromDB = JSON.parse(
      localStorage.getItem("todoItems")!
    ) as TodoItem[];

    // 날짜에 맞게 필터링
    const newTodoItems = todoItemsFromDB.filter(
      (item) => item.createdAt === currentDate
    );

    // index에 맞게 오름차순으로 정렬
    newTodoItems.sort((a, b) => a.index - b.index);

    return {
      success: true,
      data: {
        items: newTodoItems,
      },
    };
  },
  "/doneItems": (id: string) => {
    const todoItemsFromDB = JSON.parse(
      localStorage.getItem("todoItems")!
    ) as TodoItem[];

    const index = todoItemsFromDB.findIndex((item) => item.id === id);

    if (index <= -1) {
      throw new Error("Internal Error");
    }

    todoItemsFromDB[index] = {
      ...todoItemsFromDB[index],
      isDone: !todoItemsFromDB[index].isDone,
    };

    localStorage.setItem("todoItems", JSON.stringify(todoItemsFromDB));

    return {
      success: true,
      data: {
        newItem: todoItemsFromDB[index],
      },
    };
  },
  "/addTodoItem": ({
    title,
    currentDate,
  }: {
    title: string;
    currentDate: string;
  }) => {
    const lastIndex = localStorage.getItem("lastIndex") ?? "0";
    const newLastIndex = parseInt(lastIndex) + 1;

    const newTodoItem = {
      id: uuidv4(),
      title,
      isDone: false,
      index: newLastIndex,
      createdAt: currentDate,
    };

    const originalTodoItems = JSON.parse(
      localStorage.getItem("todoItems") ?? "[]"
    );

    localStorage.setItem("lastIndex", newLastIndex.toString());
    localStorage.setItem(
      "todoItems",
      JSON.stringify([...originalTodoItems, newTodoItem])
    );

    return {
      success: true,
      data: {
        item: newTodoItem,
      },
    };
  },
  "/editTitle": ({ title, id }: { title: string; id: string }) => {
    const todoItemsFromDB = JSON.parse(
      localStorage.getItem("todoItems")!
    ) as TodoItem[];

    const index = todoItemsFromDB.findIndex((item) => item.id === id);

    if (index <= -1) {
      throw new Error("Internal Error");
    }

    todoItemsFromDB[index] = {
      ...todoItemsFromDB[index],
      title,
    };

    localStorage.setItem("todoItems", JSON.stringify(todoItemsFromDB));

    return {
      success: true,
      data: {
        item: todoItemsFromDB[index],
      },
    };
  },
};

function App() {
  const [currentDate, setCurrentDate] = useState<DateObject>(
    extractDateObject(new Date())
  );
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [mode, setMode] = useState<{
    type: "add" | "edit" | "default";
    id?: string;
  }>({ type: "default" });
  const [addInput, setAddInput] = useState<string>("");
  const [editInput, setEditInput] = useState<string>("");

  useEffect(() => {
    const result = API["/getItems"](getDateString(currentDate));
    setTodoItems(result.data.items);
  }, [currentDate]);

  function handleDone(id: string) {
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

  function handleCancelAddInput() {
    setMode({
      type: "default",
    });
    setAddInput("");
  }

  function handleCancelEditInput() {
    setMode({
      type: "default",
    });
    setEditInput("");
  }

  return (
    <div style={{ background: "#1E1E1E", height: "100vh" }}>
      <header
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 15,
        }}
      >
        <div
          onClick={() => {
            // 전 날로 currentDate가 변경
            const previousDate = shiftDateBy(currentDate, -1);
            setCurrentDate(extractDateObject(previousDate));
          }}
        >
          <FiChevronLeft size={24} color="#fff" />
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: "bold", fontSize: 24, color: "#fff" }}>
            {currentDate.month}월 {currentDate.date}일
          </div>
          <div style={{ color: "#BCBCBC" }}>{currentDate.year}년</div>
        </div>
        <div
          onClick={() => {
            // 다음 날로 currentDate가 변경
            const previousDate = shiftDateBy(currentDate, 1);
            setCurrentDate(extractDateObject(previousDate));
          }}
        >
          <FiChevronRight size={24} color="#fff" />
        </div>
      </header>
      <main
        style={{
          padding: 15,
          display: "flex",
          flexDirection: "column",
          gap: 15,
        }}
      >
        {mode.type === "add" && (
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
                borderBottom: "1px solid #666",
                padding: "7px 0",
                fontWeight: "bold",
                fontSize: 16,
                color: "#fff",
              }}
            />
            <div style={{ height: 5 }} />
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <button
                style={{
                  background: "none",
                  border: "1px solid #CFFF48",
                  borderRadius: 10,
                  padding: "5px 7px",
                  color: "#CFFF48",
                  fontWeight: "bold",
                }}
                onClick={handleCancelAddInput}
              >
                취소
              </button>
              <button
                style={{
                  background: "#CFFF48",
                  border: "none",
                  borderRadius: 10,
                  padding: "5px 7px",
                  color: "#1E1E1E",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  const result = API["/addTodoItem"]({
                    title: addInput,
                    currentDate: getDateString(currentDate),
                  });

                  if (result.success === false) {
                    throw new Error("Internal Error");
                  }

                  setTodoItems([...todoItems, result.data.item]);

                  handleCancelAddInput();
                }}
              >
                저장
              </button>
            </div>
          </div>
        )}
        {todoItems.map((item) => {
          const isEditMode = mode.type === "edit" && mode.id === item.id;

          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "5px 0",
              }}
            >
              {item.isDone && (
                <>
                  <div
                    style={{ color: "#666", textDecoration: "line-through" }}
                  >
                    {item.title}
                  </div>
                  <div onClick={() => handleDone(item.id)}>
                    <FiCheck color="#CFFF48" size={26} />
                  </div>
                </>
              )}
              {!item.isDone && (
                <>
                  {isEditMode && (
                    <div style={{ width: "100%" }}>
                      <input
                        type="text"
                        value={editInput}
                        onChange={(e) => setEditInput(e.target.value)}
                        style={{
                          width: "100%",
                          background: "none",
                          border: "none",
                          borderBottom: "1px solid #666",
                          padding: "7px 0",
                          fontWeight: "bold",
                          fontSize: 16,
                          color: "#fff",
                        }}
                      />
                      <div style={{ height: 5 }} />
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
                            border: "1px solid #CFFF48",
                            borderRadius: 10,
                            padding: "5px 7px",
                            color: "#CFFF48",
                            fontWeight: "bold",
                          }}
                          onClick={handleCancelEditInput}
                        >
                          취소
                        </button>
                        <button
                          style={{
                            background: "#CFFF48",
                            border: "none",
                            borderRadius: 10,
                            padding: "5px 7px",
                            color: "#1E1E1E",
                            fontWeight: "bold",
                          }}
                          onClick={() => {
                            const result = API["/editTitle"]({
                              title: editInput,
                              id: item.id,
                            });

                            if (result.success === false) {
                              throw new Error("Internal Error");
                            }

                            setTodoItems([...todoItems, result.data.item]);
                            handleCancelEditInput();
                          }}
                        >
                          저장
                        </button>
                      </div>
                    </div>
                  )}
                  {!isEditMode && (
                    <>
                      <div
                        style={{ color: "#fff" }}
                        onClick={() => {
                          setMode({ type: "edit", id: item.id });
                          setEditInput(item.title);
                        }}
                      >
                        {item.title}
                      </div>
                      <div onClick={() => handleDone(item.id)}>
                        <FiCheck color="#666" size={26} />
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          );
        })}
      </main>
      <div
        style={{
          width: 35,
          height: 35,
          borderRadius: 60,
          backgroundColor: "#CFFF48",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          right: 20,
          bottom: 20,
        }}
        onClick={() => setMode({ type: "add" })}
      >
        <FiPlus color="#1E1E1E" size={23} />
      </div>
    </div>
  );
}

export default App;
