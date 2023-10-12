export type TodoItem = {
  id: string;
  title: string;
  isDone: boolean;
  index: number;
  createdAt: string; // yyyy-mm-dd 문자열로 저장
};

export type DateObject = {
  year: number;
  month: number;
  date: number;
};
