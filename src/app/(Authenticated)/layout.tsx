"use client";
import { getUserProfile } from "@/actions/user/user.query";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import UserActivityGuard from "@/components/UserActivityGuard";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, isPending: isUserProfileLoading } = useQuery(getUserProfile);
  const router = useRouter();
  const [isRouting, handleRoute] = useTransition();
  const needsOnboarding = data !== undefined && !data.isProfileComplete;

  useEffect(() => {
    if (data && !data.isProfileComplete) {
      handleRoute(() => router.replace("/onboarding"));
    }
  }, [data, router]);

  return (
    <main className="flex h-full w-full">
      {isRouting || needsOnboarding ? (
        <Loader2 className="animate-spin m-auto" />
      ) : (
        <>
          <SideBar />
          <div className="flex flex-col w-full">
            <NavBar />
            <UserActivityGuard>
              {isUserProfileLoading ? (
                <Loader2 className="animate-spin m-auto" />
              ) : (
                children
              )}
            </UserActivityGuard>
          </div>
        </>
      )}
    </main>
  );
};

export default AuthenticatedLayout;
