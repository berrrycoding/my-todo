import { useRecoilState } from "recoil";
import { extractDateObject, shiftDateBy } from "../../../../utils/date";
import { currentDateAtom } from "../states/currentDate";

// TODO: 여기저기 넘겨줘야하는게 귀찮음..... 개선할 방법 찾아보기
export function useCurrentDate() {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateAtom);

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
