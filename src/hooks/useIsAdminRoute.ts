import { usePathname } from "next/navigation";

export const useIsAdminRoute = () => usePathname().startsWith("/admin");
