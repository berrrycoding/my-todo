import { useEffect, useState } from "react";
import {
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiTrash,
} from "react-icons/fi";
import { API } from "./apis";
import { DateObject, TodoItem } from "./types";
import { extractDateObject, getDateString, shiftDateBy } from "./utils/date";

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
                        <div
                          onClick={() => {
                            // confirm 프롬프트
                            const isConfirm =
                              window.confirm("정말 삭제하시겠습니까?");

                            if (isConfirm) {
                              const result = API["/removeItem"](item.id);

                              if (!result.success) {
                                throw new Error("Internal Error");
                              }

                              setTodoItems(
                                todoItems.filter(
                                  (item) => item.id !== result.data.id
                                )
                              );
                            }
                          }}
                          style={{
                            border: "1px solid #666",
                            borderRadius: 10,
                            width: 28,
                            height: 25,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <FiTrash color="#666" />
                        </div>
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
