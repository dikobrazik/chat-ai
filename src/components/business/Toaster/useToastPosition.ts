import { useSyncExternalStore } from "react";
import {
  getServerToastPosition,
  getToastPosition,
  subscribeToMobileQuery,
} from "./utils";

export const useToastPosition = () =>
  useSyncExternalStore(
    subscribeToMobileQuery,
    getToastPosition,
    getServerToastPosition,
  );
