import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { colors } from "../../../../theme/colors";
import { useCurrentDate } from "../hooks/useCurrentDate";

export default function DateNavigation() {
  const { currentDate, onMovePreviousMonth, onMoveNextMonth } =
    useCurrentDate();

  const { month, date, year } = currentDate;

  return (
    <header
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
      }}
    >
      <div onClick={onMovePreviousMonth}>
        <FiChevronLeft size={24} color={colors.white} />
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontWeight: "bold", fontSize: 24, color: colors.white }}>
          {month}월 {date}일
        </div>
        <div style={{ color: colors.gray[0] }}>{year}년</div>
      </div>
      <div onClick={onMoveNextMonth}>
        <FiChevronRight size={24} color={colors.white} />
      </div>
    </header>
  );
}
