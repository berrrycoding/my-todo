import { v4 as uuidv4 } from "uuid";
import { TodoItem } from "../types";

export const API = {
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
  "/removeItem": (id: string) => {
    const todoItemsFromDB = JSON.parse(
      localStorage.getItem("todoItems")!
    ) as TodoItem[];

    const index = todoItemsFromDB.findIndex((item) => item.id === id);

    if (index <= -1) {
      throw new Error("Internal Error");
    }

    const newTodoItems = [
      ...todoItemsFromDB.slice(0, index),
      ...todoItemsFromDB.slice(index + 1),
    ];

    localStorage.setItem("todoItems", JSON.stringify(newTodoItems));

    return {
      success: true,
      data: {
        id,
      },
    };
  },
};
