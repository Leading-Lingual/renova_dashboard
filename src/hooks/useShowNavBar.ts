import { isNavbarVisible } from "@/lib/navbar.config";
import { usePathname } from "next/navigation";

export const useShowNavBar = () => {
  const pathname = usePathname();
  return isNavbarVisible(pathname);
};
