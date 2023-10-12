import { DateObject } from "../types";

export function extractDateObject(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dateOfMonth = date.getDate();

  return { year, month, date: dateOfMonth } as DateObject;
}

export function getDateString(dateObject: DateObject) {
  return `${dateObject.year}-${dateObject.month}-${dateObject.date}`;
}

export function shiftDateBy(date: DateObject, diff: number) {
  const newDate = new Date(date.year, date.month - 1, date.date);
  newDate.setDate(newDate.getDate() + diff);
  return newDate;
}
