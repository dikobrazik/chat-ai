import { usePathname } from "next/navigation";
import { useAuthContext } from "@/providers/AuthProvider/hooks";

export const useIsAcceptanceShown = () => {
  const { isGuest } = useAuthContext();
  const isChatScreen = usePathname().startsWith("/chat/");

  return isGuest && !isChatScreen;
};
