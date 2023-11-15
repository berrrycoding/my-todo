import { useState } from "react";
import { DateObject } from "../../../../types";
import { extractDateObject, shiftDateBy } from "../../../../utils/date";

// TODO: 여기저기 넘겨줘야하는게 귀찮음..... 개선할 방법 찾아보기
export function useCurrentDate() {
  const [currentDate, setCurrentDate] = useState<DateObject>(
    extractDateObject(new Date())
  );
  function handleMovePreviousMonth() {
    const previousDate = shiftDateBy(currentDate, -1);
    setCurrentDate(extractDateObject(previousDate));
  }

  function handleMoveNextMonth() {
    const previousDate = shiftDateBy(currentDate, 1);
    setCurrentDate(extractDateObject(previousDate));
  }

  return {
    currentDate,
    onMovePreviousMonth: handleMovePreviousMonth,
    onMoveNextMonth: handleMoveNextMonth,
  };
}
