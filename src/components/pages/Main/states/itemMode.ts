import { atom } from "recoil";
import { ItemMode } from "../../../../types";

export const itemModeAtom = atom<ItemMode>({
  key: "itemModeAtom",
  default: { type: "default" },
});
