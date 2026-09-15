"use client";
import { getUserProfile } from "@/actions/user/user.query";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isFetching, data } = useQuery(getUserProfile);
  const router = useRouter();
  const [isRouting, handleRoute] = useTransition();

  useEffect(() => {
    if (data && !data.isProfileComplete) {
      // handleRoute(() => router.replace("/onboarding"));
    }
  }, [data, router]);

  return (
    <main className="flex h-full w-full">
      {isFetching || isRouting ? (
        <Loader2 className="animate-spin m-auto" />
      ) : (
        <>
          <SideBar />
          <div className="flex flex-col w-full">
            <NavBar />
            {children}
          </div>
        </>
      )}
    </main>
  );
};

export default AuthenticatedLayout;
