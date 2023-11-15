import { memo } from "react";
import { FiPlus } from "react-icons/fi";
import { useSetRecoilState } from "recoil";
import { colors } from "../../../../theme/colors";
import { itemModeAtom } from "../states/itemMode";

function AddItemButton() {
  const setItemMode = useSetRecoilState(itemModeAtom);

  function handleAddItemMode() {
    setItemMode({
      type: "add",
    });
  }

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
        position: "fixed",
        right: 20,
        bottom: 20,
      }}
      onClick={handleAddItemMode}
    >
      <FiPlus color={colors.dark} size={23} />
    </div>
  );
}

export default memo(AddItemButton);
