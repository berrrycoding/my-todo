import { useEffect, useState } from "react";
import { FiCheck, FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi";
import "./App.css";

type TodoItem = {
  id: string;
  title: string;
  isDone: boolean;
  index: number;
  createdAt: string; // yyyy-mm-dd 문자열로 저장
};

const defaultItems: TodoItem[] = [
  {
    index: 0,
    id: "a1",
    title: "할일 1입니다.",
    isDone: false,
    createdAt: "2023-10-12",
  },
  {
    index: 1,
    id: "b2",
    title: "할일 2입니다.",
    isDone: false,
    createdAt: "2023-10-12",
  },
  {
    index: 2,
    id: "c3",
    title: "할일 3입니다.",
    isDone: false,
    createdAt: "2023-10-12",
  },
  {
    index: 3,
    id: "d4",
    title: "할일 4입니다.",
    isDone: true,
    createdAt: "2023-10-12",
  },
];

type DateObject = {
  year: number;
  month: number;
  date: number;
};

function extractDateObject(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dateOfMonth = date.getDate();

  return { year, month, date: dateOfMonth };
}

function shiftDateBy(date: DateObject, diff: number) {
  const newDate = new Date(date.year, date.month - 1, date.date);
  newDate.setDate(newDate.getDate() + diff);
  return newDate;
}

function App() {
  const [currentDate, setCurrentDate] = useState<DateObject>(
    extractDateObject(new Date())
  );
  const [todoItems, setTodoItems] = useState<TodoItem[]>();

  useEffect(() => {
    setTodoItems(defaultItems);
  }, []);

  function handleDone(index: number) {
    const newTodoItems = [...todoItems!];
    newTodoItems[index].isDone = !newTodoItems[index].isDone;
    setTodoItems(newTodoItems);
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
        {todoItems?.map((item, index) => (
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
                <div style={{ color: "#666", textDecoration: "line-through" }}>
                  {item.title}
                </div>
                <div onClick={() => handleDone(index)}>
                  <FiCheck color="#CFFF48" size={26} />
                </div>
              </>
            )}
            {!item.isDone && (
              <>
                <div style={{ color: "#fff" }}>{item.title}</div>
                <div onClick={() => handleDone(index)}>
                  <FiCheck color="#666" size={26} />
                </div>
              </>
            )}
          </div>
        ))}
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
      >
        <FiPlus color="#1E1E1E" size={23} />
      </div>
    </div>
  );
}

export default App;
