import { usePathname } from "next/navigation";
import { ROUTES_WITHOUT_SIDEBAR } from "./constants";

export const useIsSidebarHidden = () => {
  const pathname = usePathname();

  return ROUTES_WITHOUT_SIDEBAR.some((route) => pathname.startsWith(route));
};
