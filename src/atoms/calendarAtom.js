import { atom } from "recoil";

export const calendarValueState = atom({
  key: "calendarValueState",
  default: new Date(),
});
