import { memo } from "react";
import { FiPlus } from "react-icons/fi";
import { colors } from "../../../../theme/colors";

interface Props {
  onAddMode: () => void;
}

function AddItemButton({ onAddMode }: Props) {
  return (
    <div
      style={{
        width: 35,
        height: 35,
        borderRadius: 60,
        backgroundColor: colors.primary,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: 20,
        bottom: 20,
      }}
      onClick={onAddMode}
    >
      <FiPlus color={colors.dark} size={23} />
    </div>
  );
}

export default memo(AddItemButton);
