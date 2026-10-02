"use client";
import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/actions/user/user.query";
import { UserAppActivity } from "@/types/user.type";
import { canAccess } from "@/lib/user-access";

const UserActivityGuard = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useQuery(getUserProfile);

  const activities = (data?.activities ?? []) as UserAppActivity[];
  const allowed = canAccess(pathname, activities);

  useEffect(() => {
    if (!allowed) router.replace("/home");
  }, [allowed, router]);

  if (!allowed) return null;

  return <>{children}</>;
};

export default UserActivityGuard;
