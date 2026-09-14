import { useContext } from "react";
import { ChatSettingsContext } from "./context";

export const useChatSettingsContext = () => {
  const context = useContext(ChatSettingsContext);

  return context;
};
