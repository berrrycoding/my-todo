import { atom } from "recoil";
import { DateObject } from "../../../../types";
import { extractDateObject } from "../../../../utils/date";

export const currentDateAtom = atom<DateObject>({
  key: "currentDateAtom",
  default: extractDateObject(new Date()),
});
